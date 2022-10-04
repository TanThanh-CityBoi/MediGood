import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../../../../actions/user.actions";
import LeadingIconButton from "../../../component/LeadingIconButton";
import { AiOutlineExport } from "react-icons/ai";
import DataTableComponent from "../../../component/DataTableComponent";
import { dateUltils } from "../../../../../../utilities/date.ultil";
const columnDocs = [
  // {field: , headerName: , width: }
  { field: "stt", headerName: "STT", width: 50 },
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Tên người dùng", width: 300 },
  { field: "email", headerName: "Email", width: 150, flex: 1 },
  { field: "phone", headerName: "Số điện thoại", width: 150 },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 150,
    valueFormatter: ({ value }) => {
      const genders = ["Nam", "Nữ", "Khác"];
      return genders[value - 1];
    },
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 150,
    valueFormatter: ({ value }) => {
      return value == "user" ? "Người dùng" : "Quản trị viên";
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày tham gia",
    width: 150,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
];
function UserList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);
  const rawData = useSelector((state) => {
    console.log({ state });
    return state.userReducer.users || [];
  });
  console.log({ rawData });

  const rowDocs = rawData.map((item, index) => {
    item.id = item._id;
    item.stt = index + 1;
    return item;
  });

  const navigate = useNavigate();
  var [filter, setFilter] = useState("");
  var changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const editCourseHandleOnClick = (e) => {
    navigate(`/quan-ly/nguoi-dung/edit/${e.id}`);
  };

  const addUserOnClick = () => {
    navigate("/quan-ly/nguoi-dung/new");
  };
  return (
    <div className="manager-container">
      <span onClick={addUserOnClick} className="lw-btn">
        Thêm user
      </span>
      <div className="list-manager-wapper">
        <div className="title">Quản lý người dùng</div>
        <div className="data-table-container">
          <div className="table-header">
            <div className="heading">
              <div className="header">Danh sách user</div>
              <LeadingIconButton
                icon={<AiOutlineExport size={18} />}
                content={"Xuất Excel"}
              />
            </div>
            <div className="filter-container">
              <p className="filter-label">Nhập bất kỳ để tìm kiếm</p>
              <input
                className="filter-input"
                type="text"
                onChange={(e) => changeFilter(e)}
              ></input>
            </div>
          </div>
          <DataTableComponent
            onRowClick={editCourseHandleOnClick}
            columnDocs={columnDocs}
            rowDocs={rowDocs}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}

export default UserList;

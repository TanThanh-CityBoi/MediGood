import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bannerActions } from "../../../../../../actions/banner.actions";
import LeadingIconButton from "../../../component/LeadingIconButton";
import { AiOutlineExport } from "react-icons/ai";
import DataTableComponent from "../../../component/DataTableComponent";
import { dateUltils } from "../../../../../../utilities/date.ultil";
const bannerName = ["Trang chủ", "Rượu", "Combo", "Phụ kiện", "Khuyến mãi"];

const columnDocs = [
  // {field: , headerName: , width: }
  { field: "stt", headerName: "STT", width: 50 },
  {
    field: "type",
    headerName: "Trang chứa banner",
    width: 300,
    valueFormatter: (params) => bannerName[params.value],
  },

  {
    field: "amount",
    headerName: "Số slide",
    width: 150,
    flex: 1,
    renderCell: (params) => {
      const { slides } = params.row;
      return (
        <p
          style={{
            fontFamily: "Montserrat",
            fontSize: "1.4rem",
          }}
        >
          {slides.length}
        </p>
      );
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày chỉnh sửa",
    width: 150,
    flex: 1,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
];
function BannerList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bannerActions.getAll());
  }, []);
  const rawData = useSelector((state) => {
    console.log({ state });
    return state.bannerReducer?.banners || [];
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
    navigate(`/quan-ly/banner/edit/${e.id}`);
  };

  return (
    <div className="manager-container">
      <div className="list-manager-wapper">
        <div className="title">Quản lý banner</div>
        <div className="data-table-container">
          <div className="table-header">
            <div className="heading">
              <div className="header">Danh sách banner</div>
              <LeadingIconButton
                icon={<AiOutlineExport size={24} />}
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

export default BannerList;

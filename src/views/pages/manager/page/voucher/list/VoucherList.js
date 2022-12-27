import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { voucherActions } from "../../../../../../actions/voucher.actions";
import LeadingIconButton from "../../../component/LeadingIconButton";
import { AiOutlineExport } from "react-icons/ai";
import DataTableComponent from "../../../component/DataTableComponent";
import { dateUltils } from "../../../../../../utilities/date.ultil";
const columnDocs = [
  // {field: , headerName: , width: }
  { field: "stt", headerName: "STT", width: 50 },
  {
    field: "voucher-ui",
    headerName: "Tên khuyến mãi",
    width: 350,
    renderCell: (params) => {
      const { avtURL, name, description } = params.row;
      return (
        <div className="product-info-cell display-flex">
          <img src={avtURL} height="50px" alt="" />
          <div
            style={{
              marginLeft: "12px",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
            }}
            className="price-wrapper"
          >
            <p
              style={{
                whiteSpace: "break-spaces",
                maxWidth: "350px",
                fontSize: "1.4rem",
              }}
            >
              {name}
            </p>
            {/* <p dangerouslySetInnerHTML={{ __html: description }}></p> */}
          </div>
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Mức khuyến mãi",
    width: 150,
    renderCell: (params) => {
      const { amount, type } = params.row;
      const unit = ["VNĐ", "%"];
      return (
        <p
          style={{
            fontSize: "1.4rem",
            fontFamily: "Montserrat",
          }}
        >{`${amount.toLocaleString()} ${unit[type - 1]}`}</p>
      );
    },
  },
  { field: "quantity", headerName: "Số lượng còn lại", width: 150 },
  {
    field: "isEnable",
    headerName: "Trạng thái",
    width: 150,
    valueFormatter: (params) => {
      return params.value ? "Kích hoạt" : "Không kích hoạt";
    },
  },
  {
    field: "isPublic",
    headerName: "Phạm vi",
    width: 150,
    valueFormatter: (params) => {
      return params.value ? "Công khai" : "Mã nội bộ";
    },
  },
  {
    field: "exp",
    headerName: "Hạn sử dụng",
    width: 150,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },

  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày sửa đổi",
    width: 150,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
];

function VoucherList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(voucherActions.getAll());
  }, []);
  const rawData = useSelector((state) => {
    console.log({ state });
    return state.voucherReducer.vouchers || [];
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
    navigate(`/quan-ly/khuyen-mai/${e.id}`);
  };

  const addVoucherOnClick = () => {
    navigate("/quan-ly/khuyen-mai/new");
  };
  return (
    <div className="manager-container">
      <span onClick={addVoucherOnClick} className="lw-btn">
        Thêm voucher
      </span>
      <div className="list-manager-wapper">
        <div className="title">Quản lý khuyến mãi</div>
        <div className="data-table-container">
          <div className="table-header">
            <div className="heading">
              <div className="header">Danh sách voucher</div>
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
            rowHeight={100}
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

export default VoucherList;

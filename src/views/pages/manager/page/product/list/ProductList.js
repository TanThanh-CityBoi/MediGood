import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../../../../../actions/product.actions";
import LeadingIconButton from "../../../component/LeadingIconButton";
import { AiOutlineExport } from "react-icons/ai";
import DataTableComponent from "../../../component/DataTableComponent";
import { numberUtils } from "../../../../../../utilities";
import "./ProductList.scss";
import { dateUltils } from "../../../../../../utilities/date.ultil";
const columnDocs = [
  // {field: , headerName: , width: }
  { field: "stt", headerName: "STT", width: 50 },
  { field: "sku", headerName: "Mã SKU", width: 150 },
  {
    field: "action",
    headerName: "Sản phẩm",
    minWidth: 300,
    flex: 1,
    renderCell: (params) => {
      const { avtURL, name, price } = params.row;
      return (
        <div className="product-info-cell display-flex">
          <img src={avtURL} height="50px" alt="" />
          <div
            style={{ marginLeft: "12px", textAlign: "left" }}
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
            <p style={{ color: "red", fontWeight: "600", fontSize: "1.3rem" }}>
              {numberUtils.numberWithThousandSeperator(price || 0)}
            </p>
          </div>
        </div>
      );
    },
  },
  { field: "quantity", headerName: "Số lượng", width: 150 },
  { field: "producer", headerName: "Nhà sản xuất", width: 150 },
  {
    field: "experation",
    headerName: "Hạn sử dụng",
    width: 150,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày nhập",
    width: 150,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
];
function ProductList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getAll());
  }, []);
  const rawData = useSelector((state) => {
    console.log({ state });
    return state.productReducer.products;
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
    navigate(`/quan-ly/san-pham/${e.id}`);
  };

  const addProductOnClick = () => {
    navigate("/quan-ly/san-pham/new");
  };
  return (
    <div className="product-list-wrapper manager-container">
      <span onClick={addProductOnClick} className="lw-btn">
        Thêm sản phẩm
      </span>
      <div className="list-manager-wapper">
        <div className="title">Quản lý sản phẩm</div>
        <div className="data-table-container">
          <div className="table-header">
            <div className="heading">
              <div className="header">Danh sách khóa học</div>
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

export default ProductList;

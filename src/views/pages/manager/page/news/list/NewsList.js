import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newsActions } from "../../../../../../actions/news.actions";
import LeadingIconButton from "../../../component/LeadingIconButton";
import { AiOutlineExport } from "react-icons/ai";
import DataTableComponent from "../../../component/DataTableComponent";
import { dateUltils } from "../../../../../../utilities/date.ultil";
const columnDocs = [
  //avtUrl
  // {field: , headerName: , width: }
  { field: "stt", headerName: "STT", width: 50 },
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "news-ui",
    headerName: "Tên bài viết",
    minWidth: 600,
    flex: 2,
    renderCell: (params) => {
      const { avtUrl, title, description } = params.row;
      return (
        <div className="product-info-cell display-flex">
          <img src={avtUrl} width="100px" height="100px" alt="" />

          <div
            style={{
              marginLeft: "24px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className=""
          >
            <p
              style={{
                whiteSpace: "break-spaces",
                maxWidth: "350px",
                fontSize: "1.7rem",
                fontWeight: "600",
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    flex: 1,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    flex: 1,
    valueFormatter: (params) => {
      return dateUltils.fortmatToVietNameDay(params.value);
    },
  },
];
function NewsList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newsActions.getAll());
  }, []);
  const rawData = useSelector((state) => {
    console.log({ state });
    return state.newsReducer.newsList || [];
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
    navigate(`/quan-ly/tin-tuc/${e.id}`);
  };

  const addNewsOnClick = () => {
    navigate("/quan-ly/tin-tuc/new");
  };
  return (
    <div className="manager-container">
      <span onClick={addNewsOnClick} className="lw-btn">
        Thêm tin mới
      </span>
      <div className="list-manager-wapper">
        <div className="title">Quản lý tin tức</div>
        <div className="data-table-container">
          <div className="table-header">
            <div className="heading">
              <div className="header">Danh sách tin tức</div>
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

export default NewsList;

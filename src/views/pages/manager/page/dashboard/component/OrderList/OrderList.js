import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { receiptActions } from "../../../../../../../actions";
import DataTableComponent from "../../../../component/DataTableComponent";
import { dateUltils } from "../../../../../../../utilities/date.ultil";

function OrderList(props) {
  const dispatch = useDispatch();

  const rawData = useSelector((state) => {
    console.log({ state });
    return state.dashboardReducer.timelyData.receipt || [];
  });
  console.log({ rawData });

  const statusList = [
    { color: "#ff8b60", title: "Đã hủy" },
    { color: "#ffb246", title: "Chờ xác nhận" },
    { color: "#ffd84c", title: "Đã xác nhận" },
    { color: "#a9d78c", title: "Đang giao hàng" },
    { color: "#6bc8a3", title: "Đã nhận hàng" },
    { color: "#f00", title: "Không nhận hàng" },
  ];
  const columnDocs = [
    // {field: , headerName: , width: }
    { field: "stt", headerName: "STT", width: 50 },
    { field: "id", headerName: "Mã đơn hàng", width: 200 },
    // {
    //   field: "creater",
    //   headerName: "Người tạo đơn hàng",
    //   width: 300,
    //   renderCell: (params) => {
    //     const { creater, receiver } = params.row;
    //     return (
    //       <p
    //         style={{
    //           fontSize: "1.4rem",
    //           fontFamily: "Montserrat",
    //         }}
    //       >{`${creater.name ? creater.name : receiver.name}`}</p>
    //     );
    //   },
    // },
    {
      field: "receiver",
      headerName: "Người nhận",
      width: 150,
      valueFormatter: (params) => {
        return params.value.name;
      },
    },

    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
      renderCell: (params) => {
        const { receiver } = params.row;
        return (
          <p
            style={{
              fontSize: "1.4rem",
              fontFamily: "Montserrat",
            }}
          >{`${receiver.phone}`}</p>
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ người nhận",
      width: 350,
      renderCell: (params) => {
        const { receiver } = params.row;
        return (
          <p
            style={{
              whiteSpace: "break-spaces",
              textAlign: "left",
              fontSize: "1.2rem",
              fontFamily: "Montserrat",
            }}
          >{`${receiver.description}, ${receiver.ward.name}, ${receiver.district.name}, ${receiver.province.name}`}</p>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Doanh thu",
      width: 125,
      valueFormatter: (params) => {
        return `${params.value.toLocaleString()} VNĐ`;
      },
    },

    {
      field: "profit",
      headerName: "Lợi nhuận",
      width: 125,
      valueFormatter: (params) => {
        return `${Math.abs(params.value).toLocaleString()} VNĐ`;
      },
    },

    {
      field: "cart",
      headerName: "Số sản phẩm",
      width: 125,
      valueFormatter: (params) => {
        return `${params.value.length}`;
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
  ];

  const rowDocs = rawData?.map((item, index) => {
    item.id = item._id;
    item.stt = index + 1;
    return item;
  });

  const navigate = useNavigate();
  var [filter, setFilter] = useState("");
  var changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectFilterOnChange = (e) => {
    if (!e.target.value || e.target.value == "") {
      dispatch(receiptActions.getAll());
    } else {
      dispatch(receiptActions.getAll({ status: e.target.value }));
    }
  };

  const editCourseHandleOnClick = (e) => {
    navigate(`/quan-ly/hoa-don/${e.id}`);
  };

  const addReceiptOnClick = () => {
    navigate("/quan-ly/hoa-don/new");
  };

  const requestCheckoutList = rowDocs.filter((item) => {
    return item.payMethod && item.payMethod != 1;
  });

  const [requestModal, setRequestModal] = useState(false);
  return (
    <div className="manager-container">
      <h2
        style={{
          width: "100%",
          textAlign: "left",
          margin: "12px 0",
          fontWeight: "500",
          color: "#555",
        }}
      >
        Danh sách đơn hàng
      </h2>
      <DataTableComponent
        rowHeight={100}
        onRowClick={editCourseHandleOnClick}
        columnDocs={columnDocs}
        rowDocs={rowDocs}
        filter={filter}
      />
    </div>
  );
}

export default OrderList;

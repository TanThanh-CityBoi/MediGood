import React from "react";
import { Box, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { appActions, receiptActions } from "../../../../../../actions";
import DataTableComponent from "../../../component/DataTableComponent";
import { dateUltils } from "../../../../../../utilities/date.ultil";
import LeadingIconButton from "../../../component/LeadingIconButton";
import { AiOutlineExport } from "react-icons/ai";
import { useState } from "react";

const statusList = [
  { color: "#ff8b60", title: "Đã hủy" },
  { color: "#ffb246", title: "Chờ xác nhận" },
  { color: "#ffd84c", title: "Đã xác nhận" },
  { color: "#a9d78c", title: "Đang giao hàng" },
  { color: "#6bc8a3", title: "Đã nhận hàng" },
  { color: "#f00", title: "Không nhận hàng" },
];

function CheckoutRequestModal({ requestsRaw, open, handleClose }) {
  const handleDelete = (receipt) => {
    delete receipt.id;
    dispatch(
      receiptActions.update({ ...receipt, status: 0 }, () => {
        dispatch(appActions.showSuccessToast("Hủy thành công"));
        dispatch(receiptActions.getAll());
        setRequests(requests.filter((item) => item.id != receipt.id));
        if (requests.length === 1) {
          handleClose();
        }
      })
    );
  };
  const [requests, setRequests] = useState(requestsRaw);

  const handleConfirm = (receipt) => {
    delete receipt.id;
    dispatch(
      receiptActions.update({ ...receipt, status: 2 }, () => {
        dispatch(appActions.showSuccessToast("Xác nhận thành công"));
        dispatch(receiptActions.getAll());
        setRequests(requests.filter((item) => item.id != receipt.id));
        if (requests.length === 1) {
          handleClose();
        }
      })
    );
  };

  console.log({ requests, open, handleClose });
  const style = {
    position: "absolute",
    top: "50%",
    maxHeight: "90%",
    overflow: "scroll",

    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "48px",
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();

  const columnDocs = [
    // {field: , headerName: , width: }
    { field: "stt", headerName: "STT", width: 50 },
    { field: "id", headerName: "Mã đơn hàng", width: 200 },

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
      field: "totalPrice",
      headerName: "Tổng cộng",
      width: 125,
      valueFormatter: (params) => {
        return `${params.value.toLocaleString()} VNĐ`;
      },
    },

    {
      field: "payMethod",
      headerName: "Phương thức thanh toán",
      width: 125,
      valueFormatter: (params) => {
        return params.value === 2 ? "Momo" : "Thanh toán qua ngân  hàng";
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
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        const { status } = params.row;

        //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã giao, 5: hoàn thành, 6: Giao không thành công
        return (
          <p
            style={{
              color: "black",
              borderRadius: "5px",
              fontWeight: "bold",
              lineHeight: "40px",
              padding: "0px 12px",
              backgroundColor: `${statusList[status].color}`,
              fontSize: "1.4rem",
              fontFamily: "Montserrat",
            }}
          >{`${statusList[status].title}`}</p>
        );
      },
    },

    {
      field: "action",
      headerName: "Tùy chọn",
      minWidth: 180,
      renderCell: (params) => (
        <div
          style={{ width: "100%", paddingRight: "12px" }}
          className="justify-content-between"
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.row);
            }}
            style={{ marginRight: "12px" }}
            className="lw-outline-btn danger"
          >
            Xóa
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm(params.row);
            }}
            className="lw-btn"
          >
            Xác nhận
          </span>
        </div>
      ),
    },
  ];

  const onSubmit = (values) => {
    console.log("Accept modal log: ", values);
  };
  console.log("Receiver modal log: ", handleClose);

  const [filter, setFilter] = useState("");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="list-manager-wapper">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#780000",
              textAlign: "center",
            }}
            className="title"
          >
            Danh sách yêu cầu xác nhận thanh toán
          </div>
          <div className="data-table-container">
            <div className="table-header">
              <div
                style={{
                  flexDirection: "column",
                }}
                className="filter-container"
              >
                <label
                  style={{
                    display: "block",
                    textAlign: "left",
                    marginTop: "24px",
                  }}
                >
                  Nhập bất kỳ để tìm kiếm
                </label>
                <input
                  className="filter-input"
                  type="text"
                  onChange={(e) => setFilter(e)}
                ></input>
              </div>
            </div>
            <DataTableComponent
              autoHeight={true}
              rowHeight={100}
              columnDocs={columnDocs}
              rowDocs={requests}
              filter={filter}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default CheckoutRequestModal;

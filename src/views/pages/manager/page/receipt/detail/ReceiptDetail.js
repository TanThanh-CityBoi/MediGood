import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  appActions,
  productActions,
  receiptActions,
} from "../../../../../../actions";
import { Grid } from "@mui/material";
import BackToPageButton from "../../../component/BackToPageButton";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { numberUtils } from "../../../../../../utilities";
import DataTableComponent from "../../../component/DataTableComponent";
import "./ReceiptDetail.scss";
import LeadingIconButton from "../../../component/LeadingIconButton";
import ReceiverAddressModal from "./ReceiverAddressModal";
import ShipmentStatusModal from "./ShipmentStatusModal";
import EditReceiptCartModal from "./EditReceiptCartModal";
function ReceiptDetail(props) {
  const [receiverAddressModal, setReceiverAddressModal] = useState(false);
  const [shipmentStatusModal, setShipmentStatusModal] = useState(false);
  const [editReceiptCartModal, setEditReceiptCartModal] = useState(false);
  const statusList = [
    { color: "#f00", title: "Đã hủy" },
    { color: "#f00", title: "Chờ xác nhận" },
    { color: "#f00", title: "Đã xác nhận" },
    { color: "#f00", title: "Đang giao hàng" },
    { color: "#f00", title: "Đã nhận hàng" },
    { color: "#f00", title: "Không nhận hàng" },
  ];
  const columnDocs = [
    // {field: , headerName: , width: }
    { field: "stt", headerName: "STT", width: 50 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 300,
      flex: 1,
      renderCell: (params) => {
        const { thumbnailUrl, name, price } = params.row;
        return (
          <div className="product-info-cell display-flex">
            <img src={thumbnailUrl} height="50px" alt="" />
            <div
              style={{ marginLeft: "12px", textAlign: "left" }}
              className="price-wrapper"
            >
              <p
                style={{
                  fontFamily: "Montserrat",
                  whiteSpace: "break-spaces",
                  maxWidth: "350px",
                  fontSize: "1.4rem",
                }}
              >
                {name}
              </p>
            </div>
          </div>
        );
      },
    },
    { field: "productCode", headerName: "Mã SKU", width: 150 },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 150,
      valueFormatter: (params) => params.value.toLocaleString() + " VNĐ",
    },
    {
      field: "total",
      headerName: "Thành tiền",
      minWidth: 150,
      renderCell: (params) => {
        const { price, quantity } = params.row;
        return (
          <div className=" display-flex">
            <p
              style={{
                fontFamily: "Montserrat",
                color: "red",
                fontWeight: "600",
                fontSize: "1.3rem",
              }}
            >
              {numberUtils.numberWithThousandSeperator(price * quantity || 0) +
                " VNĐ"}
            </p>
          </div>
        );
      },
    },
  ];
  const receipt = useSelector((state) => state.receiptReducer.receipt) || {};
  const [receiptStatus, setReceiptStatus] = useState(receipt.status);
  // alert(JSON.stringify(receipt.status, null, 2))
  console.log({receiptStatus, receipt})

  const cartItems = receipt.cart?.map((item, index) => {
    const temp = {};
    temp.id = item.product._id;
    temp.stt = index + 1;
    temp.name = item.product.name;
    temp.productCode = item.product.productCode;
    temp.quantity = item.quantity;
    temp.price = item.product.price;
    temp.total = item.product.price * item.quantity;
    temp.thumbnailUrl = item.product.thumbnailUrl;
    return temp;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeReceiptStatus = () => {
    if (receiptStatus != receipt.status) {
      dispatch(
        receiptActions.update({ ...receipt, status: receiptStatus }, () => {
          dispatch(appActions.showSuccessToast("Sửa thành công"));
        })
      );
    }
  };
  const { id } = useParams();

  useEffect(() => {
    dispatch(receiptActions.getOne(id));
    dispatch(productActions.getAll());
  }, []);

  const handleDeleteOnClick = () => {
    dispatch(
      appActions.openConfirmDialog(
        "Bạn có thực sự muốn xóa hóa đơn này khỏi trang web?",
        () => {
          dispatch(
            receiptActions.deleteOne(id, () => {
              navigate("/quan-ly/hoa-don");
            })
          );
        }
      )
    );
  };

  console.log(receipt);
  return (
    <div className="receipt-detail-wrapper">
      <div className="display-flex justify-content-between">
        <BackToPageButton content={"Xem danh sách hóa đơn"} />
        <LeadingIconButton
          onClick={handleDeleteOnClick}
          style={{
            backgroundColor: "rgb(143, 0, 0)",
            color: "white",
          }}
          icon={<AiOutlineDelete size={18} />}
          content="Xóa hóa đơn"
        />
      </div>
      <h1>ID ĐƠN HÀNG: {receipt._id}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="infomation-wrapper">
            <h2 className="information-field">Người tạo đơn hàng</h2>
            <p className="infomation-content">
              {receipt.creater
                ? `${receipt.creater.name}${
                    receipt.creater.role === "user"
                      ? " - Người dùng"
                      : " - Quản trị viên"
                  }`
                : receipt.receiver?.name}
            </p>
          </div>

          <div className="infomation-wrapper">
            <div className="display-flex">
              {receiverAddressModal && (
                <ReceiverAddressModal
                  receipt={receipt}
                  open={receiverAddressModal}
                  receiver={receipt.receiver || {}}
                  handleClose={() => {
                    setReceiverAddressModal(false);
                  }}
                />
              )}
              <h2 className="information-field">Địa chỉ nhận hàng</h2>
              <span
                onClick={() => {
                  setReceiverAddressModal(true);
                }}
                className="icon-button"
              >
                <AiOutlineEdit size={18} />
              </span>
            </div>
            <p className="infomation-content">
              <strong>{`${receipt.receiver?.name}`}</strong>
              {`(${receipt?.receiver?.phone}) \n ${receipt.receiver?.description} ${receipt.receiver?.ward.name} ${receipt.receiver?.district.name} ${receipt.receiver?.province.name}`}
            </p>
            <p className="infomation-content">
              <strong>Ghi chú: </strong>
              {receipt.receiver?.note}
            </p>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="infomation-wrapper">
            <h2 style={{ marginBottom: 12 }} className="information-field">
              Trạng thái đơn hàng
            </h2>
            <div className="display-flex">
              <select
                name="status"
                value={receiptStatus ?? receipt.status}
                onChange={(e) => setReceiptStatus(e.target.value)}
              >
                {statusList.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
              <div>

              <p
                onClick={handleChangeReceiptStatus}
                style={{ marginLeft: 12, width: 110 }}
                className="lw-btn"
                >
                Cập nhật
              </p>
                </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="infomation-wrapper">
        {editReceiptCartModal && (
          <EditReceiptCartModal
            receipt={receipt}
            open={editReceiptCartModal}
            handleClose={() => setEditReceiptCartModal(false)}
          />
        )}
        <div className="display-flex">
          <h2 className="information-field">Thông tin giỏ hàng</h2>
          <span
            onClick={() => setEditReceiptCartModal(true)}
            className="icon-button"
          >
            <AiOutlineEdit size={18} />
          </span>
        </div>
        <DataTableComponent
          rowHeight={100}
          // onRowClick={editCourseHandleOnClick}
          columnDocs={columnDocs}
          rowDocs={cartItems || []}
          autoHeight={true}
          // filter={filter}
        />
      </div>

      <div
        style={{ maxWidth: "600px" }}
        className="infomation-wrapper receipt-brief-wrapper"
      >
        <div className="display-flex justify-content-between">
          <span className="receipt-brief">Tổng giá trị đơn hàng</span>
          <span className="money-formatter">
            {cartItems &&
              cartItems
                .reduce((accumulate, crr) => {
                  return crr.total + accumulate;
                }, 0)
                .toLocaleString() + "VNĐ"}
          </span>
        </div>

        
        <div className="display-flex justify-content-between">
          <span className="receipt-brief">Phí giao hàng</span>
          <span className="money-formatter">50.000 VNĐ</span>
        </div>

       

        <div className="display-flex justify-content-between">
          <span style={{ fontWeight: "bold" }} className="receipt-brief">
            Tổng cộng
          </span>
          <span style={{ fontWeight: "bold" }} className="money-formatter">
            {(
              cartItems?.reduce((accumulate, crr) => {
                return crr.total + accumulate;
              }, 0) +
                50000 
            ).toLocaleString()}{" "}
            VNĐ
          </span>
        </div>
      </div>

      <div className="infomation-wrapper">
        {shipmentStatusModal && (
          <ShipmentStatusModal
            receipt={receipt}
            open={shipmentStatusModal}
            handleClose={() => setShipmentStatusModal(false)}
          />
        )}
        <div className="display-flex">
          <h2 className="information-field">Trạng thái giao hàng</h2>
          <span className="icon-button">
            <AiOutlineEdit
              onClick={() => setShipmentStatusModal(true)}
              size={18}
            />
          </span>
        </div>
        <p className="infomation-content">
          <strong>Đơn vị vận chuyển: </strong>
          {`${receipt.shippingUnit ? receipt.shippingUnit : "Chưa cập nhật"}`}
        </p>

        <p className="infomation-content">
          <strong>Mã vận đơn: </strong>
          {`${receipt.shippingCode ? receipt.shippingCode : "Chưa cập nhật"}`}
        </p>
      </div>
    </div>
  );
}

export default ReceiptDetail;

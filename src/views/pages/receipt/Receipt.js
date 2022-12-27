import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { appActions, productActions, receiptActions } from "../../../actions";
import { AiOutlineEdit } from "react-icons/ai";
import { numberUtils } from "../../../utilities";
import { Container } from "react-bootstrap";
import DataTableComponent from "./component/DataTableComponent";
import "./Receipt.scss";

function Receipt(props) {
  const [receiverAddressModal, setReceiverAddressModal] = useState(false);
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const receiptStatus = [
    "Đã hủy",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao",
    "Đã nhận hàng",
    "Không nhận hàng",
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
        const { thumbnailUrl, name } = params.row;
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
    { field: "productCode", headerName: "Mã SP", width: 150 },
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
  const dispatch = useDispatch();
  const handleCancelOrder = () => {
    dispatch(
      receiptActions.update({ ...receipt, status: 0 }, () => {
        dispatch(appActions.showSuccessToast("Đã hủy đơn"));
      })
    );
  };
  const { id } = useParams();

  useEffect(() => {
    dispatch(receiptActions.getOne(id));
    dispatch(productActions.getAll());
  }, [id]);

  console.log(receipt);
  return (
    <Container className="receipt-detail-wrapper">
      <h1>ID ĐƠN HÀNG: {receipt._id}</h1>
      <div className="infomation-wrapper">
        <h2 className="information-field display-flex">
          Trạng thái: {"  "}
          <p className={"receipt_status_" + receipt.status}>
            {receiptStatus[receipt.status]}
          </p>
        </h2>
      </div>

      <div className="infomation-wrapper">
        <div className="display-flex">
          {/* {receiverAddressModal && (
                <ReceiverAddressModal
                  receipt={receipt}
                  open={receiverAddressModal}
                  receiver={receipt.receiver || {}}
                  handleClose={() => {
                    setReceiverAddressModal(false);
                  }}
                />
              )} */}
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
          {`(${receipt?.receiver?.phone}) \n ${receipt.receiver?.description ? receipt.receiver?.description : ""
            } ${receipt.receiver?.ward.name} ${receipt.receiver?.district.name} ${receipt.receiver?.province.name
            }`}
        </p>
      </div>

      <div className="infomation-wrapper">
        <div className="display-flex">
          <h2 className="information-field">Danh sách sản phẩm</h2>
        </div>
        <DataTableComponent
          rowHeight={100}
          columnDocs={columnDocs}
          rowDocs={cartItems || []}
          autoHeight={true}
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
          <span className="receipt-brief">
            Voucher khuyến mãi {receipt.voucher && `(${receipt.voucher.code})`}
          </span>
          <span className="money-formatter">0 VNĐ</span>
        </div>

        <div className="display-flex justify-content-between">
          <span className="receipt-brief">Phí giao hàng</span>
          <span className="money-formatter">50.000 VNĐ</span>
        </div>

        <div className="display-flex justify-content-between">
          <span className="receipt-brief">Đã thanh toán</span>
          <span className="money-formatter">0 VNĐ</span>
        </div>

        <div className="display-flex justify-content-between">
          <span style={{ fontWeight: "bold" }} className="receipt-brief">
            Tổng cộng
          </span>
          <span style={{ fontWeight: "bold" }} className="money-formatter">
            {formatter.format(receipt.totalPrice)}
          </span>
        </div>
      </div>

      <div className="infomation-wrapper">
        <p className="infomation-content">
          <strong>Đơn vị vận chuyển: </strong>
          {receipt.shippingUnit || ""}
        </p>

        <p className="infomation-content">
          <strong>Mã vận đơn: </strong>
          {receipt.shippingCode || ""}
        </p>
      </div>

      {receipt.status === 1 && (
        <button
          className="btn-cancel__receipt"
          onClick={() => {
            dispatch(
              appActions.openConfirmDialog("Xác nhận hủy đơn hàng?", () =>
                handleCancelOrder()
              )
            );
          }}
        >
          {" "}
          Hủy đơn hàng
        </button>
      )}
    </Container>
  );
}

export default Receipt;

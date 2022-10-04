import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Banner } from "../../component/BannerProduct";
import { SuggestProduct } from "../../component/SuggestProduct";
import "./orderLookup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bannerActions,
  newsActions,
  productActions,
  receiptActions,
  voucherActions,
} from "../../../actions";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Breadcrumb } from "../../component/Breadcrumb";
import { ProductComponent } from "../../component/product-component/ProductComponent";
import { PaginationCustom } from "../../component/PaginationCustom";
import DataTableComponent from "../manager/component/DataTableComponent";
import { numberUtils } from "../../../utilities";

const statusList = [
  "Đã hủy",
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang giao hàng",
  "Đã nhận hàng",
  "Không nhận hàng",
];
const OrderLookup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const banners = useSelector((state) => state.bannerReducer.banners) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataBread = [
    {
      name: "Tra cứu đơn hàng",
      link: "/tra-cuu-don-hang",
    },
  ];
  const [isSearched, setIsSearched] = useState(false);
  const receipt = useSelector((state) => state.receiptReducer.receipt) || {};
  console.log(statusList[receipt.status]);
  useEffect(() => {}, []);
  const handleSearchClick = () => {
    console.log("hha");
    navigate(`/tra-cuu-don-hang?q=${searchKey}`);
    dispatch(receiptActions.getOne(searchKey));
    setIsSearched(true);
  };

  const [searchKey, setSearchKey] = useState("");
  const columnDocs = [
    // {field: , headerName: , width: }
    { field: "stt", headerName: "STT", width: 50 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 300,
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
    { field: "sku", headerName: "Mã SKU", width: 150 },
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
  const cartItems = receipt.cart?.map((item, index) => {
    const temp = {};
    temp.id = item.product._id;
    temp.stt = index + 1;
    temp.name = item.product.name;
    temp.sku = item.product.sku;
    temp.quantity = item.quantity;
    temp.price = item.product.price;
    temp.total = item.product.price * item.quantity;
    temp.avtURL = item.product.avtURL;
    return temp;
  });
  return (
    <Container className="search-wrapper">
      {banners.length > 0 && banners[3].slides.length > 0 ? (
        <SliderComponent slides={banners[3].slides} />
      ) : (
        <Banner url="https://res.cloudinary.com/tanthanh0805/image/upload/v1645178807/LuxyWine/Banner_fxehr3.png" />
      )}
      <Breadcrumb
        style={{
          marginLeft: "-20px",
        }}
        data={dataBread}
      />
      <h1
        style={{
          fontSize: "2.4rem",
          fontWeight: 600,
        }}
      >
        Tra cứu đơn hàng
      </h1>
      <div className="input-field">
        <label htmlFor="">Nhập mã đơn hàng</label>
        <div className="display-flex">
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            type="text"
          />
          <span
            onClick={handleSearchClick}
            style={{
              border: "none",
              marginLeft: "12px",
            }}
            className="lw-btn"
          >
            Kiểm tra
          </span>
        </div>
      </div>
      {isSearched &&
        (receipt && // 👈 null and undefined check
        Object.keys(receipt).length === 0 &&
        Object.getPrototypeOf(receipt) === Object.prototype ? (
          <h1 className="search-title">
            Không tìm thấy đơn hàng với mã hóa đơn{" "}
            {`"${searchParams.get("q")}"`}
          </h1>
        ) : (
          <div className="order-detail-wrapper">
            <h1 className="search-title">
              Tìm thấy đơn hàng với mã hóa đơn {`"${receipt._id}"`}
            </h1>
            <div className="infomation-wrapper">
              <div className="display-flex">
                <h2 className="information-field">Thông tin giỏ hàng</h2>
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
                <span className="receipt-brief">
                  Voucher khuyến mãi{" "}
                  {receipt.voucher && `(${receipt.voucher.code})`}
                </span>
                <span className="money-formatter">30.000 VNĐ</span>
              </div>

              <div className="display-flex justify-content-between">
                <span className="receipt-brief">Phí giao hàng</span>
                <span className="money-formatter">30.000 VNĐ</span>
              </div>

              <div className="display-flex justify-content-between">
                <span className="receipt-brief">Đã thanh toán</span>
                <span className="money-formatter">0 VNĐ</span>
              </div>

              <div className="display-flex justify-content-between">
                <span style={{ fontWeight: "bold" }} className="receipt-brief">
                  Tổng cộng
                </span>
                <span
                  style={{ fontWeight: "bold" }}
                  className="money-formatter"
                >
                  30.000 VNĐ
                </span>
              </div>
            </div>

            <div className="infomation-wrapper">
              <div className="display-flex">
                <h2
                  style={{
                    marginTop: "18px",
                    marginBottom: "12px",
                  }}
                  className="information-field"
                >
                  Trạng thái đơn hàng
                </h2>
              </div>
              <p className="infomation-content">
                <strong>Trạn thái đơn hàng: </strong>
                {`${statusList[receipt.status]}`}
              </p>

              <p className="infomation-content">
                <strong>Đơn vị vận chuyển: </strong>
                {`${receipt.shippingUnit}`}
              </p>

              <p className="infomation-content">
                <strong>Mã vận đơn: </strong>
                {`${receipt.shippingCode}`}
              </p>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default OrderLookup;

import { useNavigate } from "react-router-dom";
import "./VoucherCard.scss";

function VoucherCard(props) {
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const navigate = useNavigate();

  return (
    <div className="voucher-card">
      <div className="voucher-avatar">
        <img src={props.voucher.avtURL}></img>
      </div>
      <div className="voucher-content">
        <p className="voucher-code">
          Mã giảm giá: <b>{props.voucher.code}</b>
        </p>

        <div className="voucher-amount">
          {props.voucher.type === 1 ? (
            <p className="discount-amount">
              {formatter.format(props.voucher.amount)}
            </p>
          ) : (
            <p className="discount-amount">{props.voucher.amount}%</p>
          )}
        </div>
        <p className="voucher-limit">
          Tối đa {formatter.format(props.voucher.limit)} trên mỗi hóa đơn
        </p>
        <div
          className="voucher-description"
          dangerouslySetInnerHTML={{ __html: props.voucher.description }}
        ></div>
        <button onClick={() => navigate("/san-pham")} className="btn-buy-now">
          Mua ngay
        </button>
      </div>
    </div>
  );
}
export { VoucherCard };

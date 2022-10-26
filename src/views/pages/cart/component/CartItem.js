import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "./CartItem.scss";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../actions";
import { appActions } from './../../../../actions/app.actions';

function CartItem(props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.quantity);
  const handleEditCart = (number) => {
    if (Number.isInteger(number) && quantity !== number) {
      console.log("modifyyyy: ", number)
      dispatch(userActions.editCart({ product: props.product._id, quantity: number }));
    }
  }
  const handleChangeQuantity = (number) => {
    if (parseInt(number) < 1) {
      setQuantity(1);
      handleEditCart(1);
    }
    else if (isNaN(parseInt(number)) && isNaN(quantity)) {
      setQuantity(1);
      handleEditCart(1);
    }
    else {
      setQuantity(parseInt(number));
      handleEditCart(parseInt(number));
    }
  };

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const originPrice = formatter.format(props.product.originPrice);
  const price = formatter.format(props.product.price);

  return (
    <Row className="cart-item">
      <Col xs={12} md={6} className="left-grid">
        <div className="product-img">
          <img src={props.product.thumbnailUrl}></img>
        </div>
        <div className="product-name">
          <p>Mã sản phẩm: {props.product.productCode}</p>
          <h1>{props.product.name}</h1>
        </div>
      </Col>
      <Col xs={12} md={6} className="right-grid">
        <div className="inp-quantity">
          <button type="button" onClick={() => handleChangeQuantity(quantity - 1)}>-</button>
          <input
            type={"number"}
            value={quantity}
            onChange={(e) => handleChangeQuantity(e.target.value)}
          />
          <button type="button" onClick={() => handleChangeQuantity(quantity + 1)}>+</button>
        </div>

        <div className="product-price">
          <div>
            {props.product.price < props.product.originPrice && (
              <p className="old-price">{originPrice}</p>
            )}
            <p className="sell-price">{price}</p>
          </div>
        </div>

        <div className="btn-delete">
          <button type="button" onClick={() => {
            dispatch(
              appActions.openConfirmDialog("Xác nhận xóa sản phẩm: " + props.product.name, () =>
                props.handleDeleteCart(props.product._id)
              )
            );
          }}>
            <AiOutlineDelete />
          </button>
        </div>
      </Col>
    </Row >
  );
}
export { CartItem };

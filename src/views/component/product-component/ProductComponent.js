import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";

import "./ProductComponent.scss";
import { useDispatch } from "react-redux";
import { userActions } from "../../../actions";

function ProductName(props) {
  return (
    <>
      <Card.Text className="product-name">{props.name}</Card.Text>
    </>
  );
}
function Description(props) {
  return (
    <>
      <Card.Text className="desciption">
        {props.origin}, {props.producer}, {props.color?.toString()},{" "}
        {props.capacity}ml{" "}
      </Card.Text>
    </>
  );
}
function NewPrice(props) {
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let price = formatter.format(props.newPrice);
  return (
    <>
      <Card.Text className="new-price">{price}</Card.Text>
    </>
  );
}
function OldPrice(props) {
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let price = formatter.format(props.originPrice);

  let percent = Math.floor(
    ((props.originPrice - props.price) / props.originPrice) * 100
  );
  return (
    <>
      <Row>
        <Col xs={8} className="text-end">
          <Card.Text className="old-price">{price}</Card.Text>
        </Col>
        <Col xs={4} className="text-start">
          <Card.Text className="discount-percent">{percent}%</Card.Text>
        </Col>
      </Row>
    </>
  );
}
function HoverContent(props) {
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    const cartItem = {
      product: id,
      quantity: 1,
    };
    dispatch(userActions.addToCart(cartItem));
  };

  return (
    <>
      <Card.Body className="hover-content row">
        <Link
          to={`/chi-tiet-san-pham/` + props.id}
          style={{
            height: "93%",
            width: "100%",
            margin: "0px",
            padding: "0px",
            backgroundColor: "#00000020",
          }}
        ></Link>
        <Row
          style={{
            height: "7%",
            backgroundColor: "#353535",
            margin: "0px",
            padding: "0px",
          }}
        >
          <Col style={{ padding: "0px", borderRight: "solid 1px white" }}>
            <Button onClick={() => handleAddToCart(props.id)}>
              <BsCartPlusFill />
            </Button>
          </Col>
          <Col style={{ padding: "0px" }}>
            <Button>Mua Ngay</Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
function NewTag() {
  return (
    <>
      <div className="new-tag">
        <div className="shape1"></div>
        <div className="shape2">NEW</div>
      </div>
    </>
  );
}
function SpecialTag() {
  return (
    <>
      <div className="special-tag">
        <div className="rectangle">Special Offer</div>
        <div className="triangle "></div>
      </div>
    </>
  );
}
//----------------------------------------------------------------------------------------------------------------//

const ProductComponent = (props) => {
  return (
    <>
      <div className="product-card discount-product">
        <Card style={{ height: "44rem" }}>
          <Card.Img variant="top" src={props.product.avtURL} />
          <Card.Body>
            <ProductName name={props.product.name} />
            <Description
              origin={props.product.origin}
              producer={props.product.producer}
              color={props.product.color}
              capacity={props.product.capacity}
            />
            {props.product.price < props.product.originPrice ? (
              <OldPrice
                originPrice={props.product.originPrice}
                price={props.product.price}
              />
            ) : (
              <Card.Text
                style={{
                  height: "20px",
                  margin: "0px",
                }}
              ></Card.Text>
            )}
            <NewPrice newPrice={props.product.price} />
          </Card.Body>
          {props.product.isNewProduct ? <NewTag /> : <></>}
          {props.product.isSpecialProduct ? <SpecialTag /> : <></>}
          <HoverContent id={props.product._id} />
        </Card>
      </div>
    </>
  );
};

export { ProductComponent };

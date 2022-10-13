import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";

import "./ManagerProductComponent.scss";
import { red } from "@mui/material/colors";

function ProductName(props) {
  return (
    <>
      <Card.Title className="product-name">{props.name}</Card.Title>
    </>
  );
}
function Description(props) {
  return (
    <>
      <Card.Text className="desciption">
        {props.origin}, {props.producer}, {props.color.toString()},{" "}
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

  let price = formatter.format(props.oldPrice);

  let percent = Math.floor(
    ((props.oldPrice - props.newPrice) / props.oldPrice) * 100
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
function HoverContent({ product, addToCart }) {
  const [amount, setAmount] = useState(1);
  return (
    <>
      <Card.Body className="hover-content row">
        <div
          to={`/chi-tiet-san-pham/` + product.id}
          style={{
            height: "90%",
            width: "100%",
            margin: "0px",
            padding: "0px",
            backgroundColor: "#00000040",
          }}
        ></div>
        <Row
          style={{
            height: "10%",
            backgroundColor: "#353535",
            margin: "0px",
            padding: "0px",
          }}
        >
          <Col
            style={{
              backgroundColor: "#db3939",
              padding: "0px",
              borderRight: "solid 1px white",
            }}
          >
            <div className="number-input">
              <span
                onClick={() => {
                  if (parseInt(amount) > 1) {
                    setAmount(parseInt(amount) - 1);
                  }
                }}
              >
                -
              </span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type={"number"}
              />
              <span
                onClick={() => setAmount(parseInt(amount) + 1)}
                className="plus"
              >
                +
              </span>
            </div>
          </Col>
          <Col style={{ padding: "0px" }}>
            <Button
              onClick={() => {
                addToCart({ ...product }, amount);
              }}
            >
              <BsCartPlusFill />
            </Button>
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

const ManagerProductComponent = (props) => {
  return (
    <>
      <div className="manage-product-card discount-product">
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
                oldPrice={props.product.originPrice}
                newPrice={props.product.price}
              />
            ) : (
              <Card.Text
                style={{
                  height: "20px",
                  margin: "0px",
                }}
              ></Card.Text>
            )}
            <NewPrice
              newPrice={
                props.product.price !== 0
                  ? props.product.price
                  : props.product.originPrice
              }
            />
          </Card.Body>
          {props.product.isNew ? <NewTag /> : <></>}
          {props.product.isSpecial ? <SpecialTag /> : <></>}
          <HoverContent product={props.product} addToCart={props.addToCart} />
        </Card>
      </div>
    </>
  );
};

export { ManagerProductComponent };

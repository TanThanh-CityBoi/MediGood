import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import "./TheFooter.scss";
import { Link } from "react-router-dom";

const TheFooter = () => {
  return (
    <Container className="container-wrapper">
      <Row className="footer">
        <Col xs={12} sm={6} className="address">
          <h1>Medi-Good</h1>
          <p
            style={{
              fontWeight: "700",
            }}
          >
            Kho rượu Nhập khẩu chính hãng, giá tốt
          </p>
          <p>Địa chỉ: 29 Đường số 8, P. Bình Hưng Hòa A, Q. Bình Tân, TP.HCM</p>
          <p>Số điện thoại: 0386 39 7579 - 090236 4049</p>
        </Col>
        <Col xs={12} sm={3} className="support">
          <p className="sp-title">HỖ TRỢ KHÁCH HÀNG</p>
          <Link to="/">
            <p>Chính sách và quy định chung</p>
          </Link>
          <Link to="/">
            <p>Điều khoản và bảo mật</p>
          </Link>
          <Link to="/">
            <p>Chính sách thanh toán</p>
          </Link>
          <Link to="/">
            <p>Chính sách đổi trả</p>
          </Link>
          <Link to="/">
            <p>Về Medi-Good</p>
          </Link>
        </Col>
        <Col xs={12} sm={3} className="contact">
          <h5>Momo: 0334.696.473</h5>
          <p>
            Theo dõi chúng tôi:
            <a href="/">
              <AiFillFacebook />
              <AiFillInstagram />
            </a>
          </p>
          <p>
            Nhập email để đăng ký nhận những thông tin khuyến mãi đến từ Medi-Good
          </p>
          <InputGroup className="my-4">
            <FormControl
              placeholder="Nhập email..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              className="support-form"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Gửi
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(TheFooter);

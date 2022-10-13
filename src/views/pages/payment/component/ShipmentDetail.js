import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Field } from "formik";
import subVn from "sub-vn";
import "./ShipmentDetail.scss";

function ShipmentDetail(props) {
  const renderOptionList = (options) => {
    return options.map((option, idx) => (
      <option key={idx} value={JSON.stringify(option)}>
        {option.name}
      </option>
    ));
  };

  return (
    <Container className="shipment-detail-wrapper">
      <Row>
        <Col xs={12} md={7} className="shipment-detail">
          <h1>Địa chỉ giao hàng</h1>
          <div className="shipment-detail-form">
            <div className="form-item">
              <label>Họ và tên</label>
              <Field name="fullname" type="text" />
              {props.errors.fullname && props.touched.fullname && (
                <p className="input-error-validation">
                  {" "}
                  {props.errors.fullname}{" "}
                </p>
              )}
            </div>

            <div className="form-item">
              <label>SĐT</label>
              <Field name="phone" type="text" />
              {props.errors.phone && props.touched.phone && (
                <p className="input-error-validation"> {props.errors.phone} </p>
              )}
            </div>

            <div className="address-group">
              <div className="input-field">
                <label htmlFor="province">Tỉnh/ Thành phố</label>
                <select
                  value={JSON.stringify(props.address.province)}
                  onChange={(e) => {
                    if (e.target.value)
                      props.address.setProvince(JSON.parse(e.target.value));
                  }}
                  name="province"
                >
                  <option value={undefined}>---Tỉnh/Thành phố---</option>
                  {renderOptionList(subVn.getProvinces())}
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="district">Quận/ Huyện</label>
                <select
                  value={JSON.stringify(props.address.district)}
                  onChange={(e) => {
                    if (e.target.value)
                      props.address.setDistrict(JSON.parse(e.target.value));
                  }}
                  name="district"
                >
                  <option value={undefined}>---Quận/ Huyện---</option>
                  {renderOptionList(
                    subVn.getDistrictsByProvinceCode(
                      props.address.province?.code
                    )
                  )}
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="ward">Phường/ Xã</label>
                <select
                  value={JSON.stringify(props.address.ward)}
                  onChange={(e) => {
                    if (
                      props.address.province.code &&
                      props.address.district.code &&
                      JSON.parse(e.target.value).code
                    ) {
                      props.address.setAddressError("");
                    }
                    if (e.target.value)
                      props.address.setWard(JSON.parse(e.target.value));
                  }}
                  name="ward"
                >
                  <option value={undefined}>---Phường/ Xã---</option>
                  {renderOptionList(
                    subVn.getWardsByDistrictCode(props.address.district?.code)
                  )}
                </select>
              </div>
            </div>
            {props.address.addressError && props.touched.phone && (
              <p className="input-error-validation">
                {" "}
                {props.address.addressError}{" "}
              </p>
            )}
            <div className="form-item">
              <label>Địa chỉ cụ thể</label>
              <Field name="description" type="text" />
            </div>
            <div className="form-item">
              <label>Ghi chú</label>
              <Field name="note" type="text" as="textarea" />
            </div>
          </div>
        </Col>
        <Col xs={12} md={5} className="payment-method-wrapper">
          <div className="payment-method">
            <div className="payment-method-item">
              <input
                type="radio"
                checked={props.payMethod === 0}
                onChange={() => props.setPayMethod(0)}
              />
              <label>Thanh toán khi nhận hàng</label>
            </div>
            <div className="payment-method-item">
              <input
                type="radio"
                checked={props.payMethod === 1}
                onChange={() => props.setPayMethod(1)}
              />
              <label>Thanh toán qua momo</label>
            </div>
            <div className="payment-method-item">
              <input
                type="radio"
                checked={props.payMethod === 2}
                onChange={() => props.setPayMethod(2)}
              />
              <label>ATM card/ Internet Banking</label>
            </div>
            <div className="transfer-info">
              <p>
                <b>CHUYỂN KHOẢN ĐỂ THANH TOÁN ĐƠN HÀNG</b>
              </p>
              <p>
                Tên tài khoản: <b>Dương Hiển Thế</b>
              </p>
              <p>STK: 01234456789</p>
              <p>Ngân hàng: Đông Dương</p>
              <p>Ghi Chú: {"<Mã ĐH>"} - SĐT</p>
              <p>Momo: 0334.696.473</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export { ShipmentDetail };

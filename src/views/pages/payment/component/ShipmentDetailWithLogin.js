import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../actions";
import { BiPlus } from "react-icons/bi";
import { AddressCard } from "./AddressCard";
import { AddAddressModal } from "./AddAddressModal";
import "./ShipmentDetailWithLogin.scss";

function ShipmentDetailWithLogin(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer.logedUser) || {};
  const [openListAddress, setOpenListAddress] = useState(false);
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  useEffect(() => {
    dispatch(userActions.getCurrent());
  }, []);

  return (
    <Container className="shipment-detail-wrapper">
      <AddAddressModal
        isOpen={openAddAddressModal}
        setOpen={setOpenAddAddressModal}
      />
      <Row>
        <Col xs={12} md={7} className="shipment-detail">
          <h1>Địa chỉ giao hàng</h1>
          <div className="shipment-detail-with-login-form">
            {userInfo?.address && userInfo.address.length > 0 ? (
              <div className="address-group">
                {!openListAddress ? (
                  <div className="current-address__modal">
                    <AddressCard
                      address={userInfo.address[props.currentAddress]}
                    />
                    <button
                      type="button"
                      onClick={() => setOpenListAddress(true)}
                    >
                      Thay đổi
                    </button>
                  </div>
                ) : (
                  <div className="modify-address__modal">
                    {userInfo.address.map((val, idx) => (
                      <div className="address-item" key={idx}>
                        <input
                          type="radio"
                          checked={props.currentAddress === idx}
                          onChange={() => props.setCurrentAddress(idx)}
                        />
                        <div onClick={() => props.setCurrentAddress(idx)}>
                          <AddressCard address={val} />
                        </div>
                      </div>
                    ))}
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn-confirm-address"
                        onClick={() => setOpenListAddress(false)}
                      >
                        Xác nhận
                      </button>
                      <button
                        type="button"
                        className="btn-add-address"
                        onClick={() => setOpenAddAddressModal(true)}
                      >
                        {" "}
                        <BiPlus /> Thêm Địa chỉ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="none-address">
                <button
                  className="btn-add-address"
                  type="button"
                  onClick={() => setOpenAddAddressModal(true)}
                >
                  {" "}
                  <BiPlus /> Thêm địa chỉ
                </button>
              </div>
            )}

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
export { ShipmentDetailWithLogin };

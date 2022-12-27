import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import SingleReceiverForm from "../component/SingleReceiverForm";
import { useDispatch } from "react-redux";
import { receiptActions } from "../../../../../../actions";

function ShipmentStatusModal({ receipt, receiver, open, handleClose }) {
  console.log({ receipt, receiver, open, handleClose });
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    padding: "48px",
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const shippingUnits = [
    "Chưa giao hàng",
    "VNPost",
    "Viettel Post",
    "Nhất tín logictis",
    "DHL",
    "Kerry",
    "Giaohangnhanh",
  ];
  const [shippingUnit, setShippingUnit] = useState(receipt.shippingUnit);
  const [shippingCode, setShippingCode] = useState(receipt.shippingCode);
  const onSubmit = (values) => {
    console.log("Receiver modal log: ", values);
    const newReceipt = { ...receipt, shippingCode, shippingUnit };
    dispatch(receiptActions.update(newReceipt, handleClose));
  };
  console.log("Receiver modal log: ", handleClose);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <h1
            style={{
              marginBottom: 24,
            }}
          >
            Chỉnh sửa thông tin trạng thái vận chuyển
          </h1>
          <div className="form-group">
            <label htmlFor="shippingUnit">Dịch vụ vận chuyển</label>
            <select
              id="shippingUnit"
              name="shippingUnit"
              value={shippingUnit}
              type="text"
              onChange={(e) => setShippingUnit(e.target.value)}
            >
              {shippingUnits.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ marginTop: 12 }} className="form-group">
            <label htmlFor="shippingCode">Mã vận đơn</label>
            <input
              id="shippingCode"
              type="text"
              value={shippingCode}
              onChange={(e) => setShippingCode(e.target.value)}
            />
          </div>

          <button
            onClick={onSubmit}
            className="lw-btn"
            style={{ marginTop: 18, display: "inline-block" }}
          >
            Lưu
          </button>
          <button
            className="lw-btn"
            onClick={handleClose}
            style={{
              display: "inline-block",
              marginLeft: "12px",
              backgroundColor: "#a00",
            }}
            type="button"
          >
            Hủy
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ShipmentStatusModal;

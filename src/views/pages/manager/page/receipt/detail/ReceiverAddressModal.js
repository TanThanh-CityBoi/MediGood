import React from "react";
import { Box, Modal } from "@mui/material";
import SingleReceiverForm from "../component/SingleReceiverForm";
import { useDispatch } from "react-redux";
import { receiptActions } from "../../../../../../actions";

function ReceiverAddressModal({ receipt, receiver, open, handleClose }) {
  console.log({ receipt, receiver, open, handleClose });
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "48px",
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log("Receiver modal log: ", values);
    const newReceipt = { ...receipt, receiver: values };
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
            Chỉnh sửa địa chỉ người nhận
          </h1>
          <SingleReceiverForm
            submitText={"Lưu"}
            receiverInfo={receiver}
            onSubmit={onSubmit}
            onCancel={handleClose}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ReceiverAddressModal;

import { Box, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
function ConfirmActionModal(props) {
  const dispatch = useDispatch();
  const confirmActionModal = useSelector(
    (state) => state.appReducer.confirmActionModal
  );

  const handleClose = () => {
    dispatch({
      type: "set",
      confirmActionModal: {
        open: false,
        action: undefined,
      },
    });
  };

  const handleAction = () => {
    confirmActionModal.action();
    setTimeout(() => {
      handleClose();
    }, 0);
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    padding: "48px",
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={confirmActionModal.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-container-fe">
          <h1
            style={{
              marginBottom: ".5rem",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Xác nhận thao tác
          </h1>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "1rem",
            }}
          >
            {confirmActionModal.content}
          </p>
          <div
            style={{ display: "flex", justifyContent: "end" }}
            className="action-btn"
          >
            <span
              style={{ marginRight: "18px" }}
              onClick={handleClose}
              className="lw-btn text-btn"
            >
              HỦY
            </span>
            <span onClick={handleAction} className="lw-btn">
              ĐỒNG Ý
            </span>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmActionModal;

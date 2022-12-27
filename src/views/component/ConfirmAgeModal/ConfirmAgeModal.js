import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
function ConfirmAgeModal() {
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

  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(true)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-container-fe">
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className="18_plus-logo display-flex"
          >
            <img src="/18_plus.svg" alt="" />
          </div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "600",
              marginTop: "24px",
            }}
          >
            Bạn có đủ 18 tuổi?
          </h1>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "24px",
            }}
          >
            Bán hoặc cung cấp hoặc lấy thuốc thay mặt cho người dưới 18 tuổi là
            vi phạm pháp luật. Điều kiện mua hàng là bạn phải xác minh rằng bạn
            từ 18 tuổi trở lên. Nếu bạn không xác minh rằng bạn đủ 18 tuổi trở
            lên, đơn đặt hàng của bạn sẽ không được xử lý.
          </p>
          <div
            style={{ display: "flex", justifyContent: "end" }}
            className="action-btn"
          >
            <span
              onClick={() => setOpen(false)}
              style={{
                width: "100%",
                display: "block",
              }}
              className="lw-btn"
            >
              Xác nhận đủ 18 tuổi
            </span>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmAgeModal;

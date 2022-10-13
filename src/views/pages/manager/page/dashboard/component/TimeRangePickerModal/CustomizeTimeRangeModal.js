import { Box, Modal } from "@mui/material";
import React from "react";
import DatePicker from "react-date-picker";

function TimeRangePickerModal({ timeRange, open, handleClose }) {
  const [value, setValue] = React.useState([null, null]);
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

  const today = new Date();
  const thisMonth = today.getMonth() + 1 + "/" + today.getFullYear();
  const lastMonth = today.getMonth() + 1 + "/" + today.getFullYear();
  const thisYear = today.getMonth() + 1 + "/" + today.getFullYear();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-container-fe">
          <div className="input-field">
            <label htmlFor="">Ngày bắt đầu</label>
            <input
              placeholder="dd-mm-yyyy"
              type="date"
              onChange={(e) => console.log(e)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="">Ngày kết thúc</label>
            <input type="date" onChange={(e) => console.log(e)} />
          </div>

          <span
            style={{
              backgroundColor: "#A90000",
            }}
            className="lw-btn"
          >
            Hủy
          </span>
          <span
            style={{
              marginTop: "12px",
            }}
            className="lw-btn"
          >
            Lưu
          </span>
        </div>
      </Box>
    </Modal>
  );
}

export default TimeRangePickerModal;

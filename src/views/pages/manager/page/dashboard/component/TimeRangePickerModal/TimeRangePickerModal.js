import { Box, Modal } from "@mui/material";
import React from "react";
import { useState } from "react";
import CustomizeTimeRangeModal from "./CustomizeTimeRangeModal.js";

function TimeRangePickerModal({ setTimeRange, open, handleClose }) {
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

  const [customizeTimeRange, setCustomizeTimeRange] = useState(false);
  const now = new Date();
  const thisMonth = now.getMonth() + 1 + "/" + now.getFullYear();
  const lastMonth = now.getMonth() + "/" + now.getFullYear();
  const thisYear = now.getFullYear();

  const selectThisYear = () => {
    return [
      new Date(now.getFullYear(), 0, 1),
      new Date(now.getFullYear(), 11, 31),
    ];
  };

  const selectLastMonth = () => {
    return [
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
      new Date(now.getFullYear(), now.getMonth(), 0),
    ];
  };

  const selectThisMonth = () => {
    return [
      new Date(now.getFullYear(), now.getMonth(), 1),
      new Date(now.getFullYear(), now.getMonth() + 1, 0),
    ];
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-container-fe">
          <span
            onClick={() => {
              setTimeRange(selectThisMonth());
              handleClose();
            }}
            className="lw-outline-btn"
          >
            Tháng này {`(${thisMonth})`}
          </span>
          <span
            onClick={() => {
              setTimeRange(selectLastMonth());
              handleClose();
            }}
            style={{
              marginTop: "12px",
            }}
            className="lw-outline-btn"
          >
            Tháng trước {`(${lastMonth})`}
          </span>
          <span
            onClick={() => {
              setTimeRange(selectThisYear());
              handleClose();
            }}
            style={{
              marginTop: "12px",
            }}
            className="lw-outline-btn"
          >
            Năm nay {`(${thisYear})`}
          </span>
          <span
            onClick={() => {
              setCustomizeTimeRange(true);
            }}
            style={{
              marginTop: "12px",
            }}
            className="lw-outline-btn"
          >
            Tùy chỉnh
          </span>
          <CustomizeTimeRangeModal
            open={customizeTimeRange}
            handleClose={() => {
              setCustomizeTimeRange(false);
            }}
          />
          <span
            onClick={handleClose}
            style={{
              marginTop: "12px",
              backgroundColor: "#A90000",
            }}
            className="lw-btn"
          >
            Hủy
          </span>
        </div>
      </Box>
    </Modal>
  );
}

export default TimeRangePickerModal;

import React, { useEffect } from "react";
import "./ToastComponent.scss";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions";
function ToastComponent(props) {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast) || {};

  useEffect(() => {
    let timer;
    if (toast.isShow) {
      timer = setTimeout(() => {
        dispatch(appActions.hideToast());
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [toast]);

  const handleClickHideToast = (e) => {
    dispatch(appActions.hideToast());
  };

  const handleShow = (e) => {
    console.log("click show");
    dispatch(appActions.showSuccessToast("Get thành công"));
  };

  const renderType = () => {
    if (toast.typeToast == "success") {
      return "#15B207";
    } else if (toast.typeToast == "fail") {
      return "#A90000";
    }
    return "#15B207";
  };

  return (
    <div
      style={{ borderLeft: `4px solid ${renderType()}` }}
      className={toast.isShow ? "toast show" : "toast"}
    >
      <div style={{ alignItems: "center", display: "flex" }}>
        <div>
          <AiFillCheckCircle
            onClick={handleShow}
            style={{ fontSize: "24px", color: renderType() }}
          ></AiFillCheckCircle>
        </div>
        <div style={{ marginLeft: "14px" }}>
          <p
            style={{ fontFamily: "'Montserrat', san-serif" }}
            className="title"
          >
            {toast.typeToast === "success" ? "Success" : "Failure"}
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', san-serif",
              paddingRight: "10px",
            }}
            className="Message"
          >
            {toast.message}
          </p>
        </div>
      </div>
      <div>
        <MdCancel
          onClick={handleClickHideToast}
          style={{ fontSize: "24px", color: "#767676", cursor: "pointer" }}
        ></MdCancel>
      </div>
    </div>
  );
}

export default ToastComponent;

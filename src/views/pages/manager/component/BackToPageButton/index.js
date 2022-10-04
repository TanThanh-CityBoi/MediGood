import { IoReturnUpBack } from "react-icons/io5";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackToPageButton.scss";
function BackToPageButton(props) {
  const navigate = useNavigate();
  function goBack() {
    if (props.onClick) {
      props.onClick();
    } else navigate(-1);
  }
  return (
    <div onClick={goBack} className="back-icon-button">
      {props.icon || <IoReturnUpBack />}

      <div className="content">{props.content}</div>
    </div>
  );
}

export default BackToPageButton;

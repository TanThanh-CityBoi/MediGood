import React from "react";
import "./scss/LeadingIconButton.scss";
function LeadingIconButton(props) {
  return (
    <div
      style={props.style || {}}
      onClick={props.onClick}
      className="display-flex leading-icon-button"
    >
      {props.icon}
      <div
        style={{
          marginLeft: 12,
          fontSize: 14,
          fontWeight: 500,
        }}
        className="content"
      >
        {props.content}
      </div>
    </div>
  );
}

export default LeadingIconButton;

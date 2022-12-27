import React from "react"

import "./Message.css"

const Message = (props) => {
  // console.log("props", props)
  return props.message.senderId !== "admin" ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{props.message.message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{props.message.message}</p>
      </div>
    </div>
  )
}

export default Message

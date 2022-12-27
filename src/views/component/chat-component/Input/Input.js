import React from "react"

import "./Input.scss"
import { BiSend } from "react-icons/bi"
const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => {
        console.log("abc")
        if (event.key === "Enter") {
          sendMessage(event)
        }
      }}
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      <BiSend className="icon" size={20} />
    </button>
  </form>
)

export default Input

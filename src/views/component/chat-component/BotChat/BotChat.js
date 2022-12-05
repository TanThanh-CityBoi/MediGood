import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import axios from "axios";
import config from "../../../../services/api/config";
import io from "socket.io-client";
import "./BotChat.scss";
import { BsDashLg } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
import { message as MessageAnt } from "antd";
const host = config.URL_AI_CHAT_BOT;

const BotChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      message:
        "Chào mừng bạn đến với Medigood Bot, hệ thống trả lời tự động chuẩn đoán bệnh dựa trên triệu chứng của bạn!",
      time: new Date(),
      senderId: "admin",
    }
  ]);
  const [isOpenBox, setIsOpenBox] = useState(false);

  const userInfo = useSelector((state) => state.userReducer.logedUser);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(host);

    socketRef.current.on("message", (data) => {
      console.log("dataAdmin", data);
      setMessages((prev) => {
        return [
          ...prev,
          { message: data, time: new Date(), senderId: "admin" },
        ];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessageToBot = async () => {
    socketRef.current.emit("message", message);
    setMessages((prev) => {
      return [
        ...prev,
        {
          message: message,
          time: new Date(),
          senderId: userInfo?._id ?? "user",
        },
      ];
    });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message) return;
    sendMessageToBot();
    setMessage("");
  };

  return (
    <div className="boxchat-outerContainer chat-container">
      <div className="container">
        <div
          className="infoBar"
          onClick={() => {
            setIsOpenBox(!isOpenBox);
          }}
        >
          <div className="leftInnerContainer">
            <h3>Medigood Auto Bot</h3>
          </div>
          <div className="rightInnerContainer">
            {!isOpenBox ? (
              <MdOutlineOpenInNew
                color="#fff"
                className="button-box-chat"
                size={24}
              />
            ) : (
              <BsDashLg color="#fff" className="button-box-chat" />
            )}
          </div>
        </div>
        {isOpenBox && (
          <React.Fragment>
            <Messages messages={messages} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BotChat;

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./Chat.scss";
import { BsDashLg } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
import { message as MessageAnt } from "antd";
import config from '../../../../services/api/config'
const host = config.URL_MAIN_BE;

const Chat = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      message:
        "Chào mừng bạn đến với Medigood, hãy đặt câu hỏi cho chuyên gia để được tư vấn miễn phí nhé.",
      time: new Date(),
      senderId: "admin",
    },
  ]);
  const [isOpenBox, setIsOpenBox] = useState(false);

  const userInfo = useSelector((state) => state.userReducer.logedUser);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(host, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
      allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader);
      },
    });

    socketRef.current.on("connect", () => {
      if (socketRef.current.connected) {
        console.log("connected ở đây sẽ thành công");
        console.log(socketRef.current.connected);
      }
    });

    socketRef.current.emit("sendMessageToAdmin", message);

    // Add chat user
    axios
      .post(`${host}api/user-chat/add-chat-user`, {
        userID: userInfo._id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    socketRef.current.on("id", (data) => {
      console.log(data);
    });

    socketRef.current.on("getMessageFromAdmin", (data) => {
      console.log("dataAdmin", data);
      setMessages((prev) => {
        return [
          ...prev,
          { message: data.message, time: new Date(), senderId: "admin" },
        ];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const getAllUserMessage = () => {
    axios
      .get(`http://localhost:5000/api/user-chat/get-chat?id=${userInfo._id}`)
      .then((data) => {
        // console.log("data", data)
        setMessages(data?.data?.message?.chat);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getAllUserMessage();
  }, []);

  const sendMessageToAdmin = async () => {
    axios
      .post(`${host}api/user-chat/send-msg-to-admin`, {
        id: userInfo._id,
        message,
      })
      .then((res) => {
        console.log(res);
        socketRef.current.emit("sendMessageToAdmin", message);
        setMessages((prev) => {
          return [
            ...prev,
            { message: message, time: new Date(), senderId: userInfo._id },
          ];
        });
      })
      .catch((err) => {
        console.log(err.message);
        MessageAnt.error("Send message to Admin bug");
      });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message) return;
    sendMessageToAdmin();
    setMessage("");
  };

  console.log("userInfo", userInfo);

  return (
    <div className="outerContainer chat-container">
      <div className="container">
        <div
          className="infoBar"
          onClick={() => {
            setIsOpenBox(!isOpenBox);
          }}
        >
          <div className="leftInnerContainer">
            <h3>Chat cùng chuyên gia</h3>
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

export default Chat;

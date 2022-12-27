import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import ChatBox from "./views/component/chat-component/ChatBox";
import ToastComponent from "./views/component/ToastComponent/ToastComponent";
import { useSelector } from "react-redux";
import BotChat from "./views/component/chat-component/BotChat/BotChat";

export default function App() {
  const authentication = useSelector((state) => state.userReducer);
  return (
    <BrowserRouter>
      <div className="main-app">
        <Routers />
        <ToastComponent></ToastComponent>
        <div className="floating-boxchats">
          <BotChat />
          {authentication.isLoggedIn && <ChatBox />}
        </div>
      </div>
    </BrowserRouter>
  );
}

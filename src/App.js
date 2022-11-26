import React, { Component } from "react"
import "./App.scss"
import { BrowserRouter } from "react-router-dom"
import Routers from "./routers"
import ChatBox from "./views/component/chat-component/ChatBox"
import ToastComponent from "./views/component/ToastComponent/ToastComponent"
import { useSelector } from "react-redux"

export default function App() {
  const authentication = useSelector((state) => state.userReducer)
  return (
    <BrowserRouter>
      <div className="main-app">
        <Routers />
        <ToastComponent></ToastComponent>
        {authentication.isLoggedIn && <ChatBox />}
      </div>
    </BrowserRouter>
  )
}

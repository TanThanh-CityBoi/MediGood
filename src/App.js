import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import ToastComponent from "./views/component/ToastComponent/ToastComponent";
import { useSelector } from "react-redux";

export default function App() {
  return (
    <BrowserRouter>
      <div className="main-app">
        <Routers />
        <ToastComponent></ToastComponent>
      </div>
    </BrowserRouter>
  );
}

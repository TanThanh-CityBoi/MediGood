import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import ToastComponent from "./views/component/ToastComponent/ToastComponent";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routers />
        <ToastComponent></ToastComponent>
      </BrowserRouter>
    );
  }
}

export default App;

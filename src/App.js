import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import ConfirmAgeModal from "./views/component/ConfirmAgeModal/ConfirmAgeModal";
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

import React from "react";
import { Outlet } from "react-router-dom";
import ManagerHeader from "./ManagerHeader";
import ManagerSideBar from "./ManagerSideBar";
import "./Manager.scss";
import { Container } from "@mui/material";
import ConfirmActionModal from "../../../component/ConfirmActionModal";

function ManagerContent(props) {
  return (
    <div className="manager-wrapper">
      <ManagerSideBar />
      <ConfirmActionModal/>
      <div className="manager-content-wrapper">
        <ManagerHeader />
        <Container className="content-of-manager" maxWidth="xl">
          <Outlet />
        </Container>
      </div>
    </div>
  );
}

export default ManagerContent;

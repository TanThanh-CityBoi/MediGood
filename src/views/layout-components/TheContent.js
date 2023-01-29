import React from "react";
import { Outlet } from "react-router-dom";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
import ConfirmActionModal from "../component/ConfirmActionModal";
import BotChat from "../../views/component/chat-component/BotChat/BotChat";
import ChatBox from "../../views/component/chat-component/Chat/Chat";
import { useSelector } from "react-redux";

const TheContent = () => {
  const authentication = useSelector((state) => state.userReducer);

  return (
    <>
      <ConfirmActionModal />
      <TheHeader></TheHeader>
      <Outlet></Outlet>
      <TheFooter></TheFooter>
      <div className="floating-boxchats">
        <BotChat />
        {authentication.isLoggedIn && <ChatBox />}
      </div>
    </>
  );
};

export default React.memo(TheContent);

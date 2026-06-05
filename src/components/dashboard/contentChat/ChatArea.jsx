import React from "react";
import Startmessage from "./Startmessage";
import Contentchat from "./Contentchat";
import { Outlet } from "react-router-dom";
import { chatprovide } from "../../context/Chatprovider";

const ChatArea = () => {
  const { gotochat } = chatprovide();
  return (
    <div className="h-screen  ">
      {gotochat ? <Contentchat /> : <Startmessage />}
    </div>
  );
};

export default ChatArea;

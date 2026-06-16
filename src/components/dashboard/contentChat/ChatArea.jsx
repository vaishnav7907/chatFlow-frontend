import React from "react";
import Startmessage from "./Startmessage";
import Contentchat from "./Contentchat";
import { Outlet } from "react-router-dom";
import { chatprovide } from "../../context/Chatprovider";

const ChatArea = () => {
  const { selecteduser } = chatprovide();

  console.log("chat area user :", selecteduser);
  
  return (
    <div className="h-screen  ">
      {selecteduser ? <Contentchat /> : <Startmessage />}
    </div>
  );
};

export default ChatArea;

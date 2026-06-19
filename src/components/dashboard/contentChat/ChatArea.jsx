import React from "react";
import Startmessage from "./Startmessage";
import Contentchat from "./Contentchat";
import { Outlet } from "react-router-dom";
import { chatprovide } from "../../context/Chatprovider";
import Groupname from "../dashboardpages/groups/Groupname";

const ChatArea = () => {
  const { selecteduser,editgroup } = chatprovide();

  console.log("chat area user :", selecteduser);

  return (
    <div className="h-screen  relative">
      {selecteduser ? <Contentchat /> : <Startmessage />}
       {editgroup && <Groupname />}
    </div>
  );
};

export default ChatArea;

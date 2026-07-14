import React from "react";
import Startmessage from "./Startmessage";
import Contentchat from "./Contentchat";
import { Outlet } from "react-router-dom";
import { chatprovide } from "../../context/Chatprovider";
import Groupname from "../dashboardpages/groups/Groupname";
import Goupcontentchat from "./Goupcontentchat";

const ChatArea = () => {
  const { selecteduser, editgroup, groupcontent } = chatprovide();
  const isChatOpen = selecteduser || groupcontent;
  console.log("chat area user :", selecteduser);

  return (
    <div className="h-full  relative">
      {/* {selecteduser ? <Contentchat /> : <Startmessage />}
      {groupcontent? <Goupcontentchat/>: <Startmessage/> } */}

      {isChatOpen ? (
        selecteduser ? (
          <Contentchat />
        ) : (
          <Goupcontentchat />
        )
      ) : (
        <Startmessage />
      )}

      {editgroup && <Groupname />}
    </div>
  );
};

export default ChatArea;

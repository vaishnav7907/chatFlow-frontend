import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { chatprovide } from "../../../context/Chatprovider";

const Allchats = () => {
  const {
    allchaats,
    setSelecteduser,
    setSelectedGroup,
    setGroupcontent,
    onlineUsers,
    selecteduser,
  } = chatprovide();

  // const isOnline = onlineUsers.includes(selecteduser._id);

  const SetallChat = (chat) => {
    if (chat.Username) {
      //personal chat
      setSelectedGroup(null);
      setGroupcontent(false);
      setSelecteduser(chat);
    } else {
      setSelecteduser(null);
      setSelectedGroup(chat);
      setGroupcontent(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {allchaats.length === 0 ? (
        <p className="text-center text-gray-400 mt-5">No chats yet</p>
      ) : (
        <>
          {allchaats.map((chaats) => (
            <div
              key={chaats._id}
              onClick={() => SetallChat(chaats)}
              className="flex items-center gap-4 p-2 group rounded-2xl bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-[#6938EF] hover:bg-[#1a2440] transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {(chaats.Username || chaats.groupname)
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>


                {/* online users */}

                
                {chaats.Username && (
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#131c31] rounded-full ${
                      onlineUsers.includes(chaats._id)
                        ? "bg-green-500"
                        : "bg-gray-800"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-base">
                    {chaats.Username || chaats.groupname}
                  </h3>

                  <span className="text-xs text-gray-400">
                    {new Date(chaats.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-400">{chaats.lastMessage}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Allchats;

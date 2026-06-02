// Maindashboard.jsx

import React from "react";
import { GoSearch } from "react-icons/go";
import Chatsidebar from "../chatsidebar/Chatsidebar";
import { Outlet } from "react-router-dom";

import Contentchat from "../contentChat/Contentchat";
import Startmessage from "../contentChat/Startmessage";
import ChatArea from "../contentChat/ChatArea";
const Maindashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      <div className="flex h-full">
        {/* SIDEBAR */}
        <div className="w-72 bg-[#10192C] p-4 border-r border-slate-700/50 flex flex-col">
          {/* LOGO */}

          <div>
            <div className="h-20 border-b border-slate-700/50 flex items-center">
              <p className="text-2xl font-semibold text-white">
                Chat
                <span className="italic font-normal text-4xl text-blue-400">
                  f
                </span>
                low
              </p>
            </div>

            {/* SEARCH */}
            <div className="pt-4 relative">
              <input
                type="text"
                placeholder="search conversation..."
                className="w-full border border-slate-700/50 focus:border-purple-500 outline-none rounded-md p-2 pl-10 text-white bg-transparent"
              />

              <GoSearch className="absolute left-3 top-7 text-slate-500 text-xl" />
            </div>
          </div>
          <div></div>
          <div>
            <div className="pb-4 pt-2">
              <Chatsidebar />
            </div>
            {/* CHAT CONTENT */}
            <div className=" pt-4 overflow-y-auto border-t border-slate-700/50">
              <Outlet />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className=" flex-1">
          <ChatArea/>
          {/* <Contentchat /> */}
        </div>
      </div>
    </div>
  );
};

export default Maindashboard;

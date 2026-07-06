// Maindashboard.jsx

import React from "react";
import { GoSearch } from "react-icons/go";
import Chatsidebar from "../chatsidebar/Chatsidebar";
import { Outlet } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
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
            <div className="flex items-center gap-3 border-b border-slate-700/50">
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white shadow-lg">
                <IoMdContact className="w-full h-full " />
              </div>

              <div className="h-20  flex items-center">
                <p className="text-2xl font-semibold text-white">
                  Chat
                  <span className="italic font-normal text-4xl text-blue-400">
                    f
                  </span>
                  low
                </p>
              </div>
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
          <div className="flex-1 flex flex-col min-h-0">
            <div className="pb-4 pt-2 ">
              <Chatsidebar />
            </div>
            {/* CHAT CONTENT */}

            <div className="flex-1 min-h-0 pt-4 overflow-y-auto border-t border-slate-700/50 scrollbar-none">
              <Outlet />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className=" flex-1 w-full">
          <ChatArea />
          {/* <Contentchat /> */}
        </div>
      </div>
    </div>
  );
};

export default Maindashboard;

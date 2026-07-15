// Maindashboard.jsx

import React, { useEffect } from "react";
import { GoSearch } from "react-icons/go";
import Chatsidebar from "../chatsidebar/Chatsidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import Contentchat from "../contentChat/Contentchat";
import Startmessage from "../contentChat/Startmessage";
import ChatArea from "../contentChat/ChatArea";
import { IoSettingsOutline } from "react-icons/io5";
import { chatprovide } from "../../context/Chatprovider";
import { IoIosLogOut } from "react-icons/io";
const Maindashboard = () => {
  const {
    ProfileImage,
    preview,
    allusers,
    getAllChats,
    getprofilepic,
    selecteduser,
    selectedGroup,
  } = chatprovide();
  const isChatOpen = selecteduser || selectedGroup;

  const navigate = useNavigate();

  useEffect(() => {
    getAllChats();
    getprofilepic();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      <div className="flex h-full">
        {/* SIDEBAR */}

        <div
          className={`${isChatOpen ? "hidden md:flex" : "flex"} w-full md:w-72 bg-[#10192C] pl-4 pr-4 pb-4 pt-1 border-r border-slate-700/50  flex-col`}
        >
          {/* LOGO */}

          <div>
            <div className="flex items-center gap-3 border-b border-slate-700/50">
              <div className="w-12 h-12 rounded-full  flex items-center justify-center shadow-xl border-4 border-slate-800">
                {ProfileImage ? (
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={ProfileImage}
                    alt="profile"
                  />
                ) : (
                  <IoMdContact className="w-full h-full rounded-full bg-cover text-white bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600" />
                )}
              </div>

              <div className="h-20  flex items-center">
                {/* <h1
                  className="font-serif italic tracking-wide
               text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                >
                  <span className="text-white">Chat</span>
                  <span className="text-white">Flow</span>
                </h1> */}

                <h1
                  className="font-serif italic tracking-wide
               text-xl sm:text-2xl md:text-3xl lg:text-3xl"
                >
                  <span className="text-white">
                    Chat
                  </span>
                  <span className="text-white">
                    <span className="italic text-gray-400">f</span>low
                  </span>
                </h1>
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

          {/* settings */}
          <div className="border-t border-slate-700/50 pt-4 flex justify-between">
            <button
              className="flex items-center gap-2 text-white hover:text-blue-400 transition"
              onClick={() => navigate("/dashboard/profile")}
            >
              <IoSettingsOutline className="text-2xl" />
              <span>Settings</span>
            </button>

            <button
              className=" text-white hover:text-red-500 hover:scale-x-110 transition duration-500"
              onClick={() => logout()}
            >
              <IoIosLogOut className="text-2xl" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className={`${isChatOpen ? "" : "hidden md:flex"} flex-1 w-full justify-center items-center`}
        >
          <ChatArea />
          {/* <Contentchat /> */}
        </div>
      </div>
    </div>
  );
};

export default Maindashboard;

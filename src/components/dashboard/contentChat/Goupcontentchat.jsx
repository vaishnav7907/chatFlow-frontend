import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { chatprovide } from "../../context/Chatprovider";
import { FaArrowRight } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Groupmembermodal from "../dashboardpages/groups/Groupmembermodal";
import { useNavigate } from "react-router-dom";
const Goupcontentchat = () => {
  const navigate = useNavigate();

  const {
    selectedGroup,
    setSelectedGroup,
    groupmessages,
    setGroupmessages,
    groupText,
    setGroupText,
    currentuserid,
    sendgroupMessages,
    addMemberModal,
    setAddMemberModal,
    searchUsers,
    setSearchUsers,
    searchData,
    setSearchData,
    onlineUsers,
    getgrpMembers,
    setGetgrpMembers,
  } = chatprovide();

  // get group chats
  console.log("group messages:", groupmessages);
  console.log("group text:", groupText);

  const getgroupchats = async () => {
    if (!selectedGroup) return;
    console.log("selectedgroup", selectedGroup._id);

    try {
      const grpchatapi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/getgroupmessages/${selectedGroup._id}`,
      );
      console.log("setgroupmessages", grpchatapi);
      setGroupmessages(grpchatapi.data || []);
    } catch (error) {
      console.log("error in get group chats", error);
    }
  };

  useEffect(() => {
    if (!selectedGroup) return;
    getgroupchats();
  }, [selectedGroup]);

  const groupOnsubmit = (e) => {
    e.preventDefault();
    sendgroupMessages();
  };

  const groupChatOnchange = (e) => {
    setGroupText(e.target.value);
  };

  const getGoupAllMembers = async () => {
    try {
      const getgrpmembersApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/getGroupMembers`,
        {
          params: {
            groupname: selectedGroup.groupname,
          },
        },
      );

      setGetgrpMembers(getgrpmembersApi.data.members);
    } catch (error) {
      console.log("error in get group members", error);
    }
  };

  useEffect(() => {
    if (!selectedGroup) return;
    getgroupchats();
    getGoupAllMembers();
  }, [selectedGroup, addMemberModal]);

  const [gotoGroupProfile, setGotoGroupProfile] = useState(false);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="flex gap-3 items-center">
            <div
              className="block md:hidden lg:hidden"
              onClick={() => setSelectedGroup(null)}
            >
              <FaArrowLeft className="text-2xl text-white" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold">
              {selectedGroup?.groupname?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg">
              {selectedGroup?.groupname}
            </h3>

            <div className="flex items-center gap-2">
              {getgrpMembers?.map((groupusers) => (
                <p className="text-xs text-slate-400" key={groupusers._id}>
                  {groupusers.Username},
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-center justify-center">
          <div className="flex justify-center items-center gap-3">
            <button
              className=" p-1 bg-white text-black h-8 w-8 rounded-full flex justify-center items-center hover:text-white hover:bg-black"
              onClick={() => navigate("/dashboard/groupchat/groupProfile")}
            >
              <FaArrowRight className="text-lg hover:scale-125 transition duration-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-900 relative">
        {groupmessages?.map((grpchat) => {
          const isOnline = onlineUsers.includes(grpchat.senderid?._id);
          return (
            <div
              key={grpchat._id}
              className={`flex ${grpchat.senderid?._id === currentuserid ? "items-end" : "items-start"}  flex-col `}
            >
              <div className="flex items-center">
                <div className="flex items-center ">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-md absolute">
                    {grpchat.senderid?.Username?.charAt(0).toUpperCase()}
                  </div>
                  <BsDot
                    className={`text-5xl relative bottom-2 left-0.5 ${
                      isOnline ? "text-green-400" : "text-gray-900"
                    }`}
                  />
                </div>

                <p className="text-xs font-semibold text-gray-300">
                  {grpchat.senderid?.Username}
                </p>
              </div>

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-lg break-words 
              ${grpchat.senderid?._id === currentuserid ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-700 text-white rounded-bl-md"}`}
              >
                <p className="text-sm text-white mt-1">{grpchat.text}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(grpchat.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={groupOnsubmit}
        className="p-4 border-t border-slate-700/50 flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-600"
          value={groupText}
          onChange={groupChatOnchange}
        />

        <button
          type="submit"
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <IoSend
            className="text-blue-400 hover:scale-110 transition duration-300"
            size={28}
          />
        </button>
      </form>
    </div>
  );
};

export default Goupcontentchat;

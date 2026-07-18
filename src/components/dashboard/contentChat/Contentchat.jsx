import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { chatprovide } from "../../context/Chatprovider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Contentchat = () => {
  const navigate = useNavigate();

  const {
    selecteduser,
    message,
    setMessage,
    messagesubmit,
    setMessagesubmit,
    sendmessage,
    currentuserid,
    onlineUsers,
    setSelecteduser,
  } = chatprovide();
  // const isOnline = onlineUsers.includes(selecteduser._id);
  const isOnline = onlineUsers.includes(selecteduser?._id);
  // console.log("message:");

  const submitMessage = async (e) => {
    e.preventDefault();
    await sendmessage();
    await getAllPersonalMsg();
  };

  const messageinput = (e) => {
    setMessagesubmit(e.target.value);
  };

  // console.log("CURRENT USER:", currentuserid);
  // console.log("SELECTED USER:", selecteduser);
  // console.log("ALL MESSAGES:", message);

  // const chatToRightperson = message.filter(
  //   (msg) =>
  //     (String(msg.senderid) === String(currentuserid) &&
  //       String(msg.recieverid) === String(selecteduser?._id)) ||
  //     (String(msg.senderid) === String(selecteduser?._id) &&
  //       String(msg.recieverid) === String(currentuserid)),
  // );
  // console.log("FILTERED:", chatToRightperson);
  // console.log("RENDER COUNT:", chatToRightperson.length);

  // const [getpersonalMsg, setGetpersonalMsg] = useState([]);
  const getAllPersonalMsg = async () => {
    if (!selecteduser?._id) return;
    try {
      const token = localStorage.getItem("token");
      const getMessageApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/getmessages/${selecteduser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage(getMessageApi.data);
    } catch (error) {
      console.log("get personal msg error", error);
    }
  };

  useEffect(() => {
    if (selecteduser?._id) {
      getAllPersonalMsg();
    }
  }, [selecteduser]);

  const token = localStorage.getItem("token");

  const deleteConnection = async (userid) => {
    try {
      const dltconnectionApi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/ChatFlow/deleteConnection/${userid}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("dlt msg connection  :", dltconnectionApi.data);

      alert("Connection deleted");
      setSelecteduser(null);
    } catch (error) {
      console.log("dlt msg connection error:", error);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-16 sm:h-20 px-3 sm:px-6 flex items-center justify-between border-b border-slate-700/50">
        {/* Left Side */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="block md:hidden"
              onClick={() => setSelecteduser(null)}
            >
              <FaArrowLeft className="text-xl sm:text-2xl text-white cursor-pointer" />
            </div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
              {selecteduser?.Username?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm sm:text-lg truncate">
              {selecteduser?.Username || "Select User"}
            </h3>

            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>

              <p className="text-[10px] sm:text-xs text-slate-400">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            if (selecteduser?._id) {
              deleteConnection(selecteduser._id);
            }
          }}
        >
          <FaMinusCircle className="text-sm sm:text-base" />
          <span className="hidden xs:inline sm:inline">Delete</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-900">
        {message.map((showmessages, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              String(showmessages.senderid) === String(currentuserid)
                ? "items-end"
                : "items-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-lg break-words ${
                String(showmessages.senderid) === String(currentuserid)
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-700 text-white rounded-bl-md"
              }`}
            >
              <p className="text-sm">{showmessages.text}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mt-1">
                {new Date(showmessages.createdAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={submitMessage}
        className="p-4 border-t border-slate-700/50 flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-600"
          value={messagesubmit}
          onChange={messageinput}
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

export default Contentchat;

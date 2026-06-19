import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { chatprovide } from "../../context/Chatprovider";

const Contentchat = () => {
  const {
    selecteduser,
    message,
    messagesubmit,
    setMessagesubmit,
    sendmessage,
    currentuserid,
  } = chatprovide();

// console.log("message:");


  const submitMessage = (e) => {
    e.preventDefault();
    sendmessage();
  };

  const messageinput = (e) => {
    setMessagesubmit(e.target.value);
  };

  console.log("CURRENT USER:", currentuserid);
  console.log("SELECTED USER:", selecteduser);
  console.log("ALL MESSAGES:", message);

  const chatToRightperson = message.filter(
    (msg) =>
      (String(msg.senderid) === String(currentuserid) &&
        String(msg.recieverid) === String(selecteduser?._id)) ||
      (String(msg.senderid) === String(selecteduser?._id) &&
        String(msg.recieverid) === String(currentuserid)),
  );
  console.log("FILTERED:", chatToRightperson);
  console.log("RENDER COUNT:", chatToRightperson.length);
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold">
            {selecteduser?.Username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg">
              {selecteduser?.Username || "Select User"}
            </h3>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="text-xs text-slate-400">online</p>
            </div>
          </div>
        </div>

        <button className="w-10 h-10 rounded-xl hover:bg-slate-800 flex items-center justify-center">
          <BsThreeDotsVertical className="text-slate-300 text-lg" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-900">
        {chatToRightperson.map((showmessages, index) => (
          <div
            key={index}
            className={`flex ${
              String(showmessages.senderid) === String(currentuserid)
                ? "justify-end"
                : "justify-start"
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

              <p className="text-[10px] text-gray-300 mt-1 text-right">
                {showmessages.time || ""}
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

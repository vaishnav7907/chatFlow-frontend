import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { chatprovide } from "../../context/Chatprovider";

const Contentchat = () => {
  const {
    gotochat,
    message,
    setMessage,
    messagesubmit,
    setMessagesubmit,
    sendmessages,
  } = chatprovide();

  console.log("messages:", message);

  const messageinput = (e) => {
    setMessagesubmit(e.target.value);
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (!messagesubmit.trim()) return;
    sendmessages();
    console.log("Message:", messagesubmit);

    setMessagesubmit("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-700/50 backdrop-blur-xl shadow-sm ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6938EF] via-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg">
            {gotochat?.Username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg tracking-wide">
              {gotochat?.Username}
            </h3>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="text-xs text-slate-400">online</p>
            </div>
          </div>
        </div>

        <button className="w-10 h-10 rounded-xl hover:bg-slate-800 transition-all duration-300 flex items-center justify-center">
          <BsThreeDotsVertical className="text-slate-300 text-lg" />
        </button>
      </div>
      <div className="h-full overflow-y-auto p-4 flex flex-col gap-3 bg-gray-900">
        {message.map((showmessages, index) => (
          <div
            key={index}
            className={`flex ${
              showmessages.sender === showmessages.senderid ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-lg break-words ${
                showmessages.sender === showmessages.senderid 
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-700 text-white rounded-bl-md"
              }`}
            >
              <p className="text-sm">{showmessages.text}</p>

              <p className="text-[10px] text-gray-300 mt-1 text-right">
                {showmessages.time}
              </p>
            </div>
          </div>
        ))}
      </div>

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

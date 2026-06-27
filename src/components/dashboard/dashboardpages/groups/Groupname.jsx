import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { chatprovide } from "../../../context/Chatprovider";
import axios from "axios";
import { useState } from "react";

const Groupname = () => {
  const { setEditgroup, creategroup, setCreategroup,currentuserid } = chatprovide();
  const [groupname, setGroupname] = useState("");
  const createGroupFn = async (e) => {
    e.preventDefault();
    try {
      const creategrpapi = await axios.post(
        `${import.meta.env.VITE_API_URL}/ChatFlow/creategroup`,
        {
          groupname,
          members: [],
            admin:currentuserid,
        },
      );

      //   console.log("group is created",creategrpapi);

      console.log("Group created:", creategrpapi.data);

      // close modal
      setEditgroup(false);

      // reset input
      setGroupname("");
    } catch (error) {
      console.log("create group error", error);
    }
  };

  return (
    //modaal
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md bg-[#131c31] rounded-3xl p-6 border border-slate-700 shadow-2xl relative">
        <button
          onClick={() => setEditgroup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New Group</h2>
        <form action="" onSubmit={createGroupFn}>
          <input
            value={groupname}
            onChange={(e) => setGroupname(e.target.value)}
            type="text"
            placeholder="Enter group name..."
            className="w-full p-3 rounded-xl bg-[#1a2440] border border-slate-700 text-white outline-none focus:border-[#6938EF] focus:ring-2 focus:ring-[#6938EF]/40 transition mb-6"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6938EF] to-[#8B5CF6] text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default Groupname;

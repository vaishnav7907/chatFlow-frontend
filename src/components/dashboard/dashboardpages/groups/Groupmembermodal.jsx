import React, { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { chatprovide } from "../../../context/Chatprovider";
import { MdAddBox } from "react-icons/md";
import axios from "axios";
const Groupmembermodal = ({ addmembertogroup }) => {
  const {
    setAddMemberModal,
    searchUsers,
    searchData,
    setSearchData,
    setSearchUsers,
  } = chatprovide();

  return (
   <div className="w-[95%] max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between p-4 border-b border-slate-700">
    <h2 className="text-white font-semibold text-lg">Add Members</h2>

    <button
      className="p-2 rounded-full hover:bg-slate-700 transition"
      onClick={() => {
        setAddMemberModal(false);
        setSearchData("");
        setSearchUsers([]);
      }}
    >
      <MdKeyboardBackspace className="text-white text-2xl" />
    </button>
  </div>

  {/* Members */}
  <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
    {Array.isArray(searchUsers) &&
      searchUsers.map((userdata) => (
        <div
          key={userdata._id}
          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold shrink-0">
              {userdata?.Username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <p className="text-white font-medium truncate">
              {userdata.Username}
            </p>
          </div>

          <button
            onClick={() => addmembertogroup(userdata._id)}
            className="shrink-0"
          >
            <MdAddBox className="text-green-500 text-2xl hover:text-green-600 hover:scale-110 transition duration-300" />
          </button>
        </div>
      ))}
  </div>
</div>
  );
};

export default Groupmembermodal;

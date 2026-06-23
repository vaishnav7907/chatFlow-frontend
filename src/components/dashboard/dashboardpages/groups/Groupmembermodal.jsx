import React, { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { chatprovide } from "../../../context/Chatprovider";
import { MdAddBox } from "react-icons/md";
import axios from "axios";
const Groupmembermodal = ({ addmembertogroup }) => {
  const { setAddMemberModal, searchUsers, searchData } = chatprovide();

  return (
    <div className="w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
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
      <div className="p-4 flex flex-col gap-3">
        {Array.isArray(searchUsers) &&
          searchUsers.map((userdata) => (
            <div
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
              key={userdata._id}
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
                  {userdata?.Username?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <p className="text-white font-medium">{userdata.Username}</p>
              </div>
              <button>
                {/* <IoCheckmark className="text-green-500 text-2xl hover:text-green-600 hover:scale-110 transition duration-700" /> */}
                <MdAddBox
                  className="text-green-500 text-2xl hover:text-green-600 hover:scale-110 transition duration-700"
                  onClick={() => addmembertogroup(userdata._id)}
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Groupmembermodal;

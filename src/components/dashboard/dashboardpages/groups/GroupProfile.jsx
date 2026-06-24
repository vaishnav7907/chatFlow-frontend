import React, { useState } from "react";
import { BsThreeDotsVertical, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { chatprovide } from "../../../context/Chatprovider";
const GroupProfile = () => {
  const navigate = useNavigate();
  const [dltGoupModal, setDltGoupModal] = useState(false);

  // const [deleteGroup, setDeleteGroup] = useState(null);

  const { selectedGroup, setGetallgroups } = chatprovide();
  const groupid = selectedGroup?._id;
  const dltgroupfn = async () => {
    try {
      if (!groupid) {
        console.log("No group selected");
        return;
      }

      const dltgroupapi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/ChatFlow/deleteGroup/${groupid}`,
      );

      console.log(dltgroupapi.data);

      setGetallgroups((prev) => prev.filter((group) => group._id !== groupid));
      //clode modal
      setDltGoupModal(false);

      //navigate to where we came from
      navigate("/dashboard/groupchat");
    } catch (error) {
      console.log("delete group error", error);
    }
  };
  return (
    <div className="h-screen w-full bg-slate-900 text-white relative">
      <div className="flex justify-between items-center px-7 py-6">
        <button onClick={() => navigate(-1)}>
          <BsArrowLeft className="text-slate-300 text-2xl hover:text-white" />
        </button>
        <div>
          <BsThreeDotsVertical
            className="text-slate-300 text-2xl cursor-pointer hover:text-white "
            onClick={() => setDltGoupModal((prev) => !prev)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-12">
        <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center text-5xl">
          👥
        </div>

        <h1 className="text-2xl font-semibold mt-6">
          {" "}
          {selectedGroup?.groupname}
        </h1>

        <p className="text-slate-400 mt-2">
          {selectedGroup?.members?.length || 0} Members
        </p>
      </div>

      {dltGoupModal && (
        <div className="absolute right-3 top-15">
          <button
            className="flex items-center justify-center bg-red-500/75 hover:bg-red-600/80 hover:scale-105 transition duration-500 text-white rounded-md p-2 w-32 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              dltgroupfn();
            }}
          >
            Delete Group
            <MdDelete className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupProfile;

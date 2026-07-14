import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { chatprovide } from "../../../context/Chatprovider";
import Groupmembermodal from "./Groupmembermodal";
const GroupProfile = () => {
  const navigate = useNavigate();
  const [dltGoupModal, setDltGoupModal] = useState(false);

  // const [deleteGroup, setDeleteGroup] = useState(null);

  const {
    selectedGroup,
    getGoupAllMembers,
    setGetallgroups,
    addMemberModal,
    setAddMemberModal,
    searchData,
    setSearchData,
    setSearchUsers,
    getgrpMembers,
    setGetgrpMembers,
  } = chatprovide();
  console.log("selected group members :", selectedGroup.members);

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

  const [addmember, setaddmember] = useState(false);
  const [searchmember, setSearchmember] = useState(false);
  //add members to group

  const addmembertogroup = async (userid) => {
    try {
      const addmemberapi = await axios.post(
        `${import.meta.env.VITE_API_URL}/ChatFlow/addMembersToGroup`,
        { groupid: selectedGroup._id, userid: userid },
      );

      alert("member added");
    } catch (error) {
      console.log("add member to group", error);
    }
  };

  //search group users
  const searchGroupUsers = async (value) => {
    try {
      const searchuserApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/searchUser?search=${value}`,
      );
      setSearchUsers(searchuserApi.data);
    } catch (error) {
      console.log(error);
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
      {/* members */}
      <div className="w-full">
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

        <div className="mt-8 flex justify-center px-4 relative">
  {/* Search / Add Member Section */}
  <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-2xl p-4 shadow-xl w-full max-w-xl">

    {searchmember ? (
      <>
        <div className="flex items-center gap-3 w-full">
          <IoSearchOutline className="text-gray-400 text-xl shrink-0" />

          <input
            type="search"
            placeholder="Search members..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-sm sm:text-base"
            value={searchData}
            onChange={(e) => {
              const value = e.target.value;
              setSearchData(value);

              if (value.trim()) {
                searchGroupUsers(value);
                setAddMemberModal(true);
              } else {
                setSearchUsers([]);
                setAddMemberModal(false);
              }
            }}
          />
        </div>

        <button
          onClick={() => {
            setSearchmember(false);
            setSearchData("");
            setSearchUsers([]);
            setAddMemberModal(false);
          }}
          className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center transition duration-300 shrink-0"
        >
          <MdClose className="text-red-400 text-xl" />
        </button>
      </>
    ) : (
      <>
        <span className="text-gray-400 text-sm text-center sm:text-left flex-1">
          Add new members to this group
        </span>

        <button
          onClick={() => setSearchmember(true)}
          className="w-11 h-11 rounded-xl bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg hover:scale-105 transition duration-300 shrink-0"
        >
          <IoPersonAddSharp className="text-white text-xl" />
        </button>
      </>
    )}
  </div>

  {/* Modal */}
  {addMemberModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md">
        <Groupmembermodal addmembertogroup={addmembertogroup} />
      </div>
    </div>
  )}
</div>
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

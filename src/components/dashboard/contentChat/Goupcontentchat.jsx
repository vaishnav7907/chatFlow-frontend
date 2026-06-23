import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { chatprovide } from "../../context/Chatprovider";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Groupmembermodal from "../dashboardpages/groups/Groupmembermodal";
import { useNavigate } from "react-router-dom";
const Goupcontentchat = () => {

  const navigate= useNavigate()

  const {
    selectedGroup,
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

  const [addmember, setaddmember] = useState(false);
  const [searchmember, setSearchmember] = useState(false);

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

  // serach

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

  const [getgrpMembers, setGetgrpMembers] = useState([]);

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

  const [gotoGroupProfile,setGotoGroupProfile]=useState(false)



  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold">
            {selectedGroup?.groupname?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg">
              {selectedGroup?.groupname}
            </h3>

            <div className="flex items-center gap-2">
              {getgrpMembers.map((groupusers) => (
                <p className="text-xs text-slate-400" key={groupusers._id}>
                  {groupusers.Username},
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-center justify-center">
          {searchmember && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-3 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-xl px-3 py-2 w-72 shadow-lg">
                <IoSearchOutline
                  className="text-gray-400 text-xl"
                  onClick={() => setAddMemberModal(true)}
                />

                <input
                  type="search"
                  placeholder="Add members..."
                  className="bg-transparent flex-1 text-white placeholder:text-gray-400 outline-none text-sm"
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
              <button onClick={() => setSearchmember(false)}>
                <MdClose className="text-blue-400 hover:scale-125 hover:text-red-600 transition duration-700 text-2xl " />
              </button>
            </div>
          )}

          <button
            className="w-10 h-10 rounded-xl hover:bg-slate-800 flex items-center justify-center"
            onClick={() => setSearchmember(true)}
          >
            <IoPersonAddSharp className="text-green-500 text-lg hover:scale-125 transition duration-500 hover:text-green-600" />
          </button>
          <div className="flex justify-center items-center gap-3">
           

            <button className="w-10 h-10 rounded-xl hover:bg-slate-800 flex items-center justify-center">
              <BsThreeDotsVertical
                className="text-slate-300 text-lg"
                onClick={() => setGotoGroupProfile(true)}
              />
            </button>

             {gotoGroupProfile && (
              <button className=" p-1 bg-white text-black h-8 w-8 rounded-full flex justify-center items-center hover:text-white hover:bg-black" onClick={()=>navigate("/groupProfile")}>
                <FaArrowRight  className="text-lg hover:scale-125 transition duration-700"/>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-900 relative">
        {addMemberModal && (
          <div className="absolute right-0 p-3">
            <Groupmembermodal addmembertogroup={addmembertogroup} />
          </div>
        )}

        {groupmessages.map((grpchat) => (
          <div
            key={grpchat._id}
            className={`flex ${grpchat.senderid?._id === currentuserid ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-lg break-words 
              ${grpchat.senderid?._id === currentuserid ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-700 text-white rounded-bl-md"}`}
            >
              <p className="text-xs font-semibold text-gray-300">
                {grpchat.senderid?.Username}
              </p>

              <p className="text-sm text-white mt-1">{grpchat.text}</p>
            </div>
          </div>
        ))}
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

import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { chatprovide } from "../../../context/Chatprovider";
import axios from "axios";
const Groupchats = () => {
  const {
    setEditgroup,
    setGroupcontent,
    getallgroups,
    setGetallgroups,
    setSelectedGroup,
    setSelecteduser,
  } = chatprovide();

  const groupgetfn = async () => {
    
    try {
      const getgroupapi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/getgroup`,
      );

      setGetallgroups(getgroupapi.data);

      console.log("get all groups:", getgroupapi.data);
    } catch (error) {
      console.log("getall group error:", error);
    }
  };

  useEffect(() => {
    groupgetfn();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      {/* Fixed button */}
      <div className="flex justify-end bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-lg p-1 mb-2">
        <button className="bg-gray-800 rounded-full p-0.5 flex justify-center items-center">
          <AiOutlinePlus
            className="text-white text-2xl hover:scale-110 transition duration-500 font-bold"
            onClick={() => setEditgroup(true)}
          />
        </button>
      </div>

      {/* Scrollable groups */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 scrollbar-none">
        {getallgroups.map((getgrp) => (
          <div
            key={getgrp._id}
            className="flex items-center p-2 rounded-2xl gap-4 group bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-[#6938EF] hover:bg-[#1a2440] transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelecteduser(null);
              setSelectedGroup(getgrp);
              setGroupcontent(true);
            }}
          >
            {/* Avatar */}
            <div className="">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getgrp?.groupname?.charAt(0)?.toUpperCase() || "U"}
              </div>
              
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-base">
                  {getgrp.groupname}
                </h3>
                <span className="text-xs text-gray-400">2 min</span>
              </div>
              <p className="text-sm text-gray-400">hey man</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groupchats;

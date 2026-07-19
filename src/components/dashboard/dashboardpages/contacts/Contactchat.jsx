import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatprovide } from "../../../context/Chatprovider";
import { TiUserAdd } from "react-icons/ti";

const Contactchat = () => {
  const navigatee = useNavigate();

  const myid = localStorage.getItem("userId");

  const token = localStorage.getItem("token");

  console.log("token:", token);

  const {
    allusers,
    setAllusers,
    selecteduser,
    setSelecteduser,
    onlineUsers,
    ProfileImage,
    preview,
  } = chatprovide();

  const getallusers = async () => {
    try {
      const allusersapi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/getallusers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("all users:", allusersapi.data);
      console.log("Logged In User ID:", myid);
      allusersapi.data.forEach((user) => {
        console.log({
          username: user.Username,
          id: user._id,
        });
      });

      setAllusers(
        allusersapi.data.filter((user) => String(user._id) !== String(myid)),
      );
    } catch (error) {
      console.log("erro in getallusers...:", error);
    }
  };

  useEffect(() => {
    getallusers();
  }, []);

  const sendRequest = async (recieverId) => {
    try {
      const requestapi = await axios.post(
        `${import.meta.env.VITE_API_URL}/ChatFlow/createRequest`,
        { reciever: recieverId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("send request", requestapi.data);

      alert("request send successfully");
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className=" w-full   flex flex-col gap-2">
      {allusers.map((user) => {
        const isOnline = onlineUsers.includes(user._id);

        return (
          <div
            className="flex items-center p-2  rounded-2xl gap-4 group bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-[#6938EF] hover:bg-[#1a2440] transition-all duration-300 cursor-pointer"
            key={user._id}
            onClick={() => {
              console.log("CLICKED USER:", user);
              console.log("MY ID:", myid);

              setSelecteduser(user);
            }}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full">
                {user.ProfileImage ? (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={user.ProfileImage}
                    alt="profile"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user?.Username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 right-0 w-3 h-3  rounded-full">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isOnline ? "bg-green-500" : "bg-gray-900"
                    }`}
                  ></span>

                  {/* <p className="text-xs text-slate-400">
                  {isOnline ? "Online" : "Offline"}
                </p> */}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between ">
                <h3 className="text-white font-semibold text-base">
                  {user.Username}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendRequest(user._id);
                  }}
                >
                  <TiUserAdd className="text-white hover:text-green-400 text-2xl" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contactchat;

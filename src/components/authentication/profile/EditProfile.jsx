import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate() 
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0F172A] p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-700/40 bg-[#111827]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-3">
        <div>
          <div className="flex gap-7">
            <button className=" w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition" onClick={()=>navigate(-1)}>
              <FaArrowLeft />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-white"> Edit Profile </h1>
              {/* <p className="text-slate-400 text-sm"> Update your personal information </p> */}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center pl-12 pr-12 pt-5 pb-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl border-4 border-slate-800">
              <IoMdContact className="w-14 h-14 text-white" />
            </div>

            <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center border-2 border-slate-900 transition">
              <IoCameraOutline className="text-white text-lg" />
            </button>
          </div>

         
            <div className="pt-5  w-full flex flex-col justify-center gap-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full h-11 px-4 rounded-xl bg-gray-800 text-white  border border-gray-700  placeholder:text-gray-400  focus:outline-none focus:border-cyan-400 focus:ring-2  focus:ring-cyan-400/20  transition-all duration-300"
              />

              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full h-11 px-4 rounded-xl bg-gray-800 text-white border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400  focus:ring-2  focus:ring-cyan-400/20  transition-all duration-300"
              />
            </div>
          

          <div className=" w-full flex justify-end pt-5">
            <button className="flex justify-center items-center gap-2 text-white border border-cyan-300 rounded-lg p-1 bg-gray-900 hover:scale-105 transition duration-500">
              {" "}
              <MdSaveAs size={26} className="" />{" "}
              <p className="text-lg">save</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

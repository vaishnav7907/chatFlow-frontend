import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Welcomepage = () => {

  const navigate = useNavigate()

  return (
    // <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden flex justify-center items-center">

        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden flex justify-center items-center">
          
      <div className=" flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl  font-semibold text-white">
          Chat<span className="italic font-normal text-6xl text-blue-400">f</span>low
        </h1>

        <div className="bg-white h-8 w-8 rounded-full flex justify-center items-center mt-7 animate-pulse" onClick={()=>navigate("/authentication")}>
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcomepage;

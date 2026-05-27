import axios from "axios";
import React from "react";
import { useState } from "react";

const Allchats = () => {
 

  return (
    <div className="group w-full p-3 rounded-2xl bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-[#6938EF] hover:bg-[#1a2440] transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
            A
          </div>

          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#131c31] rounded-full"></div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-base">Abhinand</h3>

            <span className="text-xs text-gray-400">2 min</span>
          </div>

          <p className="text-sm text-green-400">● Online</p>
        </div>
      </div>
    </div>
  );
};

export default Allchats;

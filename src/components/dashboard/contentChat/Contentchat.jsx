import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
const Contentchat = () => {
  return (
    
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-700/50 backdrop-blur-xl shadow-sm w-full">
            <div className="flex items-center gap-4">
              <div className="">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6938EF] via-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                  A
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg tracking-wide">
                  Abhinand
                </h3>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="text-xs text-slate-400">online</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl hover:bg-slate-800 transition-all duration-300 flex items-center justify-center">
                <BsThreeDotsVertical className="text-slate-300 text-lg" />
              </button>
            </div>
          </div>
    
  )
}

export default Contentchat

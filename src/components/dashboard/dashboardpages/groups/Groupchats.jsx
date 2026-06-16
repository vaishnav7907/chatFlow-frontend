import React from 'react'

const Groupchats = () => {
  return (
    <div className=" w-full   flex flex-col gap-2">
      
        <div
          className="flex items-center p-2  rounded-2xl gap-4 group bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-[#6938EF] hover:bg-[#1a2440] transition-all duration-300 cursor-pointer"
         
          
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
          
            </div>

            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#131c31] rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-base">
                group 1
              </h3>

              <span className="text-xs text-gray-400">2 min</span>
            </div>

            <p className="text-sm  text-gray-400">hey man</p>
          </div>
        </div>
    
    </div>
  )
}

export default Groupchats

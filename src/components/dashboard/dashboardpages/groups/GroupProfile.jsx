import React, { useState } from "react";
import { BsThreeDotsVertical, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const GroupProfile = () => {
  const navigate = useNavigate();
  const [dltGoupModal, setDltGoupModal] = useState(false);
  return (
    <div className="h-screen w-full bg-slate-900 text-white relative">
      <div className="flex justify-between items-center px-7 py-6">
        <button onClick={() => navigate(-1)}>
          <BsArrowLeft className="text-slate-300 text-2xl hover:text-white" />
        </button>
        <div>
          <BsThreeDotsVertical className="text-slate-300 text-2xl cursor-pointer hover:text-white" onClick={()=>setDltGoupModal((prev)=>!prev)}/>
        </div>
      </div>

      <div className="flex flex-col items-center mt-12">
        <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center text-5xl">
          👥
        </div>

        <h1 className="text-2xl font-semibold mt-6">Group Name</h1>

        <p className="text-slate-400 mt-2">10 Members</p>
      </div>

      {dltGoupModal && (
        <div className="absolute right-3 top-15">
          <button className="flex items-center justify-center bg-red-500 text-white rounded-md p-2">
            Delete Group
            <MdDelete className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupProfile;

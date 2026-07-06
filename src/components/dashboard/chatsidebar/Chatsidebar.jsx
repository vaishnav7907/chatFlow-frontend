import React from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { MdGroups2 } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Chatsidebar = () => {
  const chattypes = [
    {
      path: "/dashboard",
      icon: <HiOutlineChatBubbleOvalLeft size={22} />,
      name: "Chats",
    },
    {
      path: "/dashboard/groupchat",
      icon: <MdGroups2 size={22} />,
      name: "Groups",
    },
    {
      path: "/dashboard/contactchats",
      icon: <IoMdContacts size={22} />,
      name: "Contacts",
    },
  ];

  return (
    <div className="pt-4">
      <div className="grid grid-cols-3 gap-3">
        {chattypes.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-2 rounded-2xl py-3 transition-all duration-300 ${
                isActive
                  ? " border border-gray-500 text-white"
                  : "bg-slate-800/40 border border-transparent text-slate-400 hover:bg-slate-700/50 hover:text-white"
              }`
            }
          >
            <div className="text-2xl">{item.icon}</div>
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Chatsidebar;

import React from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { MdGroups2 } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";
const Chatsidebar = () => {
  const chattypes = [
    {
      path: "/dashboard",
      icon: <HiOutlineChatBubbleOvalLeft />,
      name: "All chats",
    },
    {
      path: "/dashboard/groupchat",
      icon: <MdGroups2 />,
      name: "Groups",
    },
    {
      path: "/dashboard/contactchats",
      icon: <IoMdContacts />,
      name: "Contacts",
    },
  ];
  return (
    <div className=" flex flex-col pt-4  ">
      <div className="flex  justify-between">
        {chattypes.map((chatdata, index) => (
          <Link key={index} to={chatdata.path} className="group  ">
            <div className="flex flex-col justify-center items-center cur">
              <p className="text-gray-500 group-hover:text-white">
                {chatdata.icon}
              </p>
              <p className="text-gray-500 group-hover:text-white">
                {chatdata.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      
    </div>
  );
};

export default Chatsidebar;

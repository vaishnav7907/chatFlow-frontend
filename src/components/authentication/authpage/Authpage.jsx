import React from "react";
import { Link, Outlet } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { IoChatbubbleEllipses, IoCheckmarkDone } from "react-icons/io5";

const Authpage = () => {
  const authclick = [
    {
      icon: <LuLogIn size={22} />,
      path: "/authentication",
    },
    {
      icon: <FaCircleUser size={22} />,
      path: "/authentication/signup",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08111f] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[170px]" />
      </div>

      <div className="relative flex h-screen ">

        {/* LEFT SIDE */}
        <div className="w-1/2 flex justify-center items-center px-16">

          <div>

            <span className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
               Real Time Messaging
            </span>

            <h1 className="text-6xl font-black text-white mt-8 leading-tight">
              Stay
              <br />
              Connected
              <br />
              Everywhere.
            </h1>

            <p className="text-gray-400 text-lg mt-8 max-w-lg leading-8">
              ChatFlow lets you connect with friends, family and teams in
              real-time. Beautiful UI, secure messaging and powerful group
              conversations.
            </p>

            <div className="flex gap-5 mt-12">
              {authclick.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center transition duration-300 hover:scale-110"
                >
                  {item.icon}
                </Link>
              ))}
            </div>

          </div>

        </div>

        {/* CENTER PHONE */}
       

        {/* RIGHT SIDE */}
        <div className=" h-full w-full flex justify-center items-center ">

          <div className=" bg-white rounded-2xl w-[50%] h-[60%] p-3 flex justify-center items-center">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Authpage;
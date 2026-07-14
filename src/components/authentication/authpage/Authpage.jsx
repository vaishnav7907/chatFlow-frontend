import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { IoChatbubbleEllipses, IoCheckmarkDone } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
const Authpage = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-[#08111f] overflow-hidden w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[170px]" />
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-6 sm:px-10 lg:px-16 py-10 lg:py-0">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <button
                className="p-1 bg-white text-black h-8 w-8 rounded-full flex justify-center items-center hover:text-white hover:bg-gray-900 transition"
                onClick={() => navigate("/")}
              >
                <FaArrowLeft className="text-lg hover:scale-125 transition duration-700" />
              </button>

              <span className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                Real Time Messaging
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-8 leading-tight">
              Stay
              <br />
              Connected
              <br />
              Everywhere.
            </h1>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg mt-8 max-w-lg leading-7 lg:leading-8 mx-auto lg:mx-0">
              ChatFlow lets you connect with friends, family and teams in
              real-time. Beautiful UI, secure messaging and powerful group
              conversations.
            </p>

            <div className="flex justify-center lg:justify-start gap-5 mt-10">
              {authclick.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center transition duration-300 hover:scale-110"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-5 sm:px-8 pb-10 lg:pb-0">
          <div className="bg-white rounded-2xl w-full sm:w-[90%] md:w-[75%] lg:w-[75%] xl:w-[65%] min-h-[450px] p-4 sm:p-6 flex justify-center items-center shadow-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authpage;

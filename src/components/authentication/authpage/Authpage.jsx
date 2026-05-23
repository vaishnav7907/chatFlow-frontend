import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import Signup from "../signup/Signup";
import Signin from "../signin/Signin";
import { Link, Outlet } from "react-router-dom";

const Authpage = () => {
  const authclick = [
    {
      icon: <LuLogIn size={30} />,
      path: "/authentication",
    },
    {
      icon: <FaCircleUser size={30} />,
      path: "/authentication/signup",
    },
  ];
  return (
    <div className="h-screen w-full  bg-gradient-to-br from-[#0B1120] via-[#1F1147] to-[#6938EF] shadow-[0_0_40px_rgba(105,56,239,0.35)]    ">
      <div className="flex  items-center ">
        <div className="w-1/2  h-screen flex flex-col  justify-center items-center  ">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide text-center">
            Your <span className="text-[#A78BFA] italic">people</span>, Your{" "}
            <span className=" italic">space</span>.
          </h1>

          
            <div className= " flex gap-5 mt-10 ">
              {authclick.map((data, index) => (
              <Link to={data.path} className="text-white  hover:scale-125 transition duration-500" >
                
                  {data.icon}
                  
              
              </Link>
          ))}

            </div>
        </div>

        <div className="bg-white w-1/2 h-screen flex col justify-center items-center rounded-l-full    ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Authpage;

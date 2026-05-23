import React from "react";
import { BsLock } from "react-icons/bs";
const Signup = () => {
  return (
    <div className="">
      <div>
        <div className="flex flex-col items-center">
          <h1>
            <BsLock size={26} className="text-[#2b136b] " />
          </h1>
          <h1 className="text-black font-semibold text-2xl">
            Create an account
          </h1>
        </div>

        <div className="pt-7">
          <form action="">
            <div className="flex flex-col gap-3 ">
              <div>
                <label htmlFor="" className="text-[#9794AA] ">Email Address</label> <br />
                <input type="email" placeholder="Enter your email address" className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"/>
              </div>
              <div>
                <label htmlFor="" className="text-[#9794AA]">Usename</label> <br />
                <input type="text" placeholder="Enter username" className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"/>
              </div>
              <div>
                <label htmlFor="" className="text-[#9794AA]">Password</label> <br />
                <input type="password" placeholder="Enter your password " className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"/>
              </div>
              <div>
                <label htmlFor="" className="text-[#9794AA]">Cnfirm Password</label> <br />
                <input type="password" placeholder="Confirm password " className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"/>
              </div>

              <div className="pt-7">
                <button className=" bg-gradient-to-r from-[#7C4DFF] via-[#6938EF] to-[#5B21B6] hover:from-[#8B5CF6] hover:via-[#7C3AED] hover:to-[#6D28D9] w-full h-12  rounded-2xl text-white">
                  create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

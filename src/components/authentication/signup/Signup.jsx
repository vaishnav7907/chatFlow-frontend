import React, { useState } from "react";
import { BsLock } from "react-icons/bs";
import { chatprovide } from "../../context/Chatprovider";
import axios from "axios";
const Signup = ({ todashboard }) => {
  const [usersignup, setUsersignup] = useState([]);

  // const [Email, setEmail] = useState("");
  // const [Username, setUsername] = useState("");
  // const [Password, setPassword] = useState("");

  const { Email, setEmail, Username, setUsername, Password, setPassword,connectSocket } =chatprovide();

  const emailonchange = (e) => {
    setEmail(e.target.value);
  };

  const usernameonchange = (e) => {
    setUsername(e.target.value);
  };

  const passwordonchange = (e) => {
    setPassword(e.target.value);
  };

  const submitt = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/ChatFlow/signup`, {
        Email,
        Username,
        Password,
      });
      
      todashboard(true);
      connectSocket()
      alert("Signup success ✅");
      
    } catch (error) {
       const msg = error.response?.data?.message;

      if (error.response?.status === 409) {
        alert("Email already exists ❌");
      } else if (msg) {
        alert(msg); // ✅ shows real error (invalid email/password)
      }
      
    }
  };

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
          <form action="" onSubmit={submitt}>
            <div className="flex flex-col gap-3 ">
              <div>
                <label htmlFor="" className="text-[#9794AA] ">
                  Email Address
                </label>{" "}
                <br />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"
                  value={Email}
                  onChange={emailonchange}
                />
              </div>
              <div>
                <label htmlFor="" className="text-[#9794AA]">
                  Username
                </label>{" "}
                <br />
                <input
                  type="text"
                  placeholder="Enter username"
                  className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"
                  value={Username}
                  onChange={usernameonchange}
                />
              </div>
              <div>
                <label htmlFor="" className="text-[#9794AA]">
                  Password
                </label>{" "}
                <br />
                <input
                  type="password"
                  placeholder="Enter your password "
                  className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"
                  value={Password}
                  onChange={passwordonchange}
                />
              </div>
              {/* <div>
                <label htmlFor="" className="text-[#9794AA]">
                  Cnfirm Password
                </label>{" "}
                <br />
                <input
                  type="password"
                  placeholder="Confirm password "
                  className="h-9 border mt-1 border-gray-400 rounded-md w-96 pl-4 focus:border-bs-teal-400 focus:outline-0"
                />
              </div> */}

              <div className="pt-7">
                <button
                  className=" bg-gradient-to-r from-[#7C4DFF] via-[#6938EF] to-[#5B21B6] hover:from-[#8B5CF6] hover:via-[#7C3AED] hover:to-[#6D28D9] w-full h-12  rounded-2xl text-white"
                  type="submit"
                >
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

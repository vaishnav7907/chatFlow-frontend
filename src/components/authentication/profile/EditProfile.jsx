import React, { useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { CiSquareMinus } from "react-icons/ci";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import axios from "axios";
import { chatprovide } from "../../context/Chatprovider";
const EditProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    image,
    setImage,
    preview,
    setPreview,
    ProfileImage,
    setProfileImage,
    currentuserid,
    Email,
    setEmail,
    setUsername,
    Username,
  } = chatprovide();

  const onchangeProfileImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file)); //here we use url.createobjecturl. beacause   in image tag cant access or show files example:<img src={file} /> . image expect url. so here we create a temporary url. here this is working <img src={preview} /> beacuse file changed to a url
  };

  const uploadprofileimg = async () => {
    if (!image) {
      alert("please select an image");
      return;
    }

    try {
      const formData = new FormData(); //here form data used for without using form data , axios sends request as json so its give undefined response, the image is a file so here using formdata, so here browser sendsContent-Type:multipart/form-data  so backend gets file.

      formData.append("image", image); // here "image" is fieldname and image is state. append is used for send image to empty formData

      const uploadimage = await axios.put(
        `${import.meta.env.VITE_API_URL}/ChatFlow/uploadprofileimage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // setPreview(uploadimage.data.user.profileImage)
      console.log(uploadimage.data);

      setProfileImage(uploadimage.data.profileImg);
      setPreview("");
      console.log("Before setImage(null):", image);
      setImage(null);
      console.log("After setImage(null):", image);
      alert("profile image uploaded successfully");
    } catch (error) {
      console.log("profile img uploaded error", error);
      alert("Upload failed");
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const editProfileInfo = async () => {
    try {
      const updateProfileApi = await axios.patch(
        `${import.meta.env.VITE_API_URL}/ChatFlow/updateProfile/${currentuserid}`,
        { Email, Username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(updateProfileApi.data);
      alert(updateProfileApi.data.message);
    } catch (error) {
      console.log("error in update profile", error);
    }
  };

  const handlesave = async () => {
    console.log("image:", image);

    await editProfileInfo();

    if (image) {
      console.log("Uploading image...");
      await uploadprofileimg();
    }
  };

  //incoming request
  const [inrequests, setInrequests] = useState([]);
  const incomingRequests = async () => {
    try {
      const incomingRequestApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/incomingRequest`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("incoming requests", incomingRequestApi.data);

      setInrequests(incomingRequestApi.data);
    } catch (error) {
      console.log("error in incomig requests", error);
    }
  };

  useEffect(() => {
    incomingRequests();
  }, []);

  // outgoing request

  const [outRequest, setoutRequest] = useState([]);
  const outgoingRequest = async () => {
    try {
      const outgoingrequestApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/ChatFlow/outgoingRequest`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("outgoing requests", outgoingrequestApi.data);
      setoutRequest(outgoingrequestApi.data);
    } catch (error) {
      console.log("error in outgoing requests", error);
    }
  };

  useEffect(() => {
    outgoingRequest();
  }, []);

  // const [acceptreq, setAcceptreq] = useState("");
  const acceptRequest = async (requestid) => {
    try {
      const acceptrequestApi = await axios.patch(
        `${import.meta.env.VITE_API_URL}/ChatFlow/acceptRequest/${requestid}`,
        {}, //empty object used for . here we using patch ,so patch (url,body,headers). here without using empty object. the header portion changed to "data" instead of empty object.
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(acceptrequestApi.data);
      //refresh both requests
      // setInrequests((prev) =>    
      //   prev.map((req) =>
      //     req._id === requestid
      //       ? { ...req, status: acceptrequestApi.data.status || "accepted" }
      //       : req,
      //   ),
      // );
      await incomingRequests();
      await outgoingRequest();
    } catch (error) {
      console.log("accept request  error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0F172A] p-10 flex flex-col items-center w-full overflow-y-auto">
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-700/40 bg-[#111827]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-3">
          <div>
            <div className="flex gap-7">
              <button
                className=" w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  {" "}
                  Edit Profile{" "}
                </h1>
                {/* <p className="text-slate-400 text-sm"> Update your personal information </p> */}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center md:pl-12 md:pr-12 pt-5 pb-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full  flex items-center justify-center shadow-xl border-4 border-slate-800">
                {preview ? (
                  <img
                    src={preview}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : ProfileImage ? (
                  <img
                    src={ProfileImage}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <IoMdContact className="w-full h-full object-cover rounded-full text-white bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600" />
                )}
              </div>

              <input
                type="file"
                id="profileImage"
                hidden
                accept="image/*"
                onChange={onchangeProfileImg}
              />

              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center border-2 border-slate-900 cursor-pointer"
              >
                <IoCameraOutline className="text-white text-lg" />
              </label>
            </div>

            <div className="pt-5  w-full flex flex-col justify-center gap-4">
              <div className=" relative w-full">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full h-11 pl-4 pr-4 rounded-xl bg-gray-800 text-white  border border-gray-700  placeholder:text-gray-400  focus:outline-none focus:border-cyan-400 focus:ring-2  focus:ring-cyan-400/20  transition-all duration-300 relative"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer pl-1" />
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full h-11 pl-4 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400  focus:ring-2  focus:ring-cyan-400/20  transition-all duration-300"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FaPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
              </div>
            </div>

            <div className=" w-full flex justify-end pt-5">
              <button
                className="flex justify-center items-center gap-2 text-white border border-cyan-300 rounded-lg p-1 bg-gray-900 hover:scale-105 transition duration-500"
                onClick={handlesave}
              >
                <MdSaveAs size={26} className="" />
                <p className="text-lg">save</p>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-700/40 bg-[#111827]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-3 mt-3">
          <div className="">
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">
                {" "}
                Chat Requests{" "}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B2438] rounded-2xl p-5 border border-slate-700 hover:border-green-500 transition">
                <div className=" mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Incoming Requests
                  </h3>
                </div>

                {inrequests.length === 0 ? (
                  <div className="text-center text-slate-400 py-6">
                    No incoming requests found
                  </div>
                ) : (
                  inrequests.map((incomingdata) => (
                    <div
                      className=" mt-1 flex items-center gap-2 p-3 rounded-2xl bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-green-800 hover:bg-[#1a2440] transition-all duration-300 cursor-pointer group"
                      key={incomingdata._id}
                    >
                      {/* Avatar */}
                      <div className="">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          {incomingdata.sender?.ProfileImage ? (
                            <img
                              src={incomingdata.sender?.ProfileImage}
                              alt="loading"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg">
                              {incomingdata.sender?.Username?.charAt(
                                0,
                              ).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 flex items-center justify-between">
                        <h3 className="text-white font-semibold text-base">
                          {incomingdata.sender?.Username}
                        </h3>
                        
                          {/* <button>
                            <FaMinusCircle className="text-lg  text-red-400" />
                          </button> */}
                       
                          <button
                            className="p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              acceptRequest(incomingdata._id);
                            }}
                          >
                            <FaHandshakeSimple className="text-2xl text-white hover:text-cyan-300 transition-colors duration-300" />
                          </button>
                       
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="bg-[#1B2438] rounded-2xl p-5 border border-slate-700 hover:border-blue-500 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Outgoing Requests
                  </h3>
                </div>

                {/* <div className="text-slate-400 text-sm text-center py-8">
                  No outgoing requests
                </div> */}

                {outRequest.length === 0 ? (
                  <div className="text-center text-slate-400 py-6">
                    No outgoing requests found
                  </div>
                ) : (
                  outRequest.map((outgoingdata) => (
                    <div
                      className=" mt-1 flex items-center gap-2 p-3 rounded-2xl bg-[#131c31]/70 backdrop-blur-sm border border-slate-800 hover:border-green-800 hover:bg-[#1a2440] transition-all duration-300 cursor-pointer group"
                      key={outgoingdata._id}
                    >
                      {/* Avatar */}
                      <div className="">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          {outgoingdata.reciever?.ProfileImage ? (
                            <img
                              src={outgoingdata.reciever?.ProfileImage}
                              alt="loading"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg">
                              {outgoingdata.reciever?.Username?.charAt(
                                0,
                              ).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 flex items-center justify-between">
                        <h3 className="text-white font-semibold text-base">
                          {outgoingdata.reciever?.Username}
                        </h3>

                        <button className="p-1">
                          <CiSquareMinus className="text-2xl text-white hover:text-red-600 transition-colors duration-300" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

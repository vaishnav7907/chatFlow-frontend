import React, { useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
const EditProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
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
      alert("profile image uploaded successfully");
      
    } catch (error) {
      console.log("profile img uploaded error",error);
      alert("Upload failed");
    }
  };

  useEffect(()=>{
    return()=>{
      if(preview){
        URL.revokeObjectURL(preview)
      }
    }
  },[preview])
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0F172A] p-6 flex justify-center items-center">
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
              <h1 className="text-2xl font-bold text-white"> Edit Profile </h1>
              {/* <p className="text-slate-400 text-sm"> Update your personal information </p> */}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center pl-12 pr-12 pt-5 pb-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full  flex items-center justify-center shadow-xl border-4 border-slate-800">
              {preview ? (
                <img
                  src={preview}
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
              />
              <FaPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer pl-1" />
            </div>

            <div className="relative w-full">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full h-11 pl-4 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400  focus:ring-2  focus:ring-cyan-400/20  transition-all duration-300"
              />
              <FaPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className=" w-full flex justify-end pt-5">
            <button className="flex justify-center items-center gap-2 text-white border border-cyan-300 rounded-lg p-1 bg-gray-900 hover:scale-105 transition duration-500" onClick={uploadprofileimg}>
              <MdSaveAs size={26} className="" />
              <p className="text-lg">save</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

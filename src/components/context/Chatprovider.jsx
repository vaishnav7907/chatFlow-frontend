import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatContext = createContext();

export const Chatprovider = ({ children }) => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [isauth, setIsauth] = useState(false);

  const [message, setMessage] = useState([]);
  const [messagesubmit, setMessagesubmit] = useState("");

  const [allusers, setAllusers] = useState([]);
  const [socket, setSocket] = useState(null);

  const currentuserid = localStorage.getItem("userId");
  const [selecteduser, setSelecteduser] = useState(null);

  //group
  const [editgroup, setEditgroup] = useState(false);

  const [creategroup, setCreategroup] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [getallgroups, setGetallgroups] = useState([]);
  const [groupcontent, setGroupcontent] = useState(false);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !currentuserid) return;
    socket.emit("join", currentuserid);
  }, [socket, currentuserid]);

  useEffect(() => {
    if (!socket) return;
    socket.on("recievemessage", (newMsg) => {
      console.log("NEW MESSAGE:", newMsg);
      setMessage((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("recievemessage");
    };
  }, [socket]);

  const sendmessage = () => {
    if (!messagesubmit.trim() || !selecteduser) return;

    socket.emit("sendmessage", {
      senderid: currentuserid,
      recieverid: selecteduser._id,
      text: messagesubmit,
    });

    setMessagesubmit("");
  };

  return (
    <ChatContext.Provider
      value={{
        Email,
        setEmail,

        Username,
        setUsername,

        Password,
        setPassword,

        isauth,
        setIsauth,

        message,
        setMessage,

        messagesubmit,
        setMessagesubmit,

        selecteduser,
        setSelecteduser,

        allusers,
        setAllusers,

        sendmessage,

        currentuserid,

        editgroup,
        setEditgroup,

        creategroup,
        setCreategroup,

        groupcontent,
        setGroupcontent,

        getallgroups,
        setGetallgroups,

        selectedGroup,
        setSelectedGroup
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide = () => useContext(ChatContext);

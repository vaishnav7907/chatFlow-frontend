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
  const [groupmessages, setGroupmessages] = useState([]);
  const [groupText, setGroupText] = useState("");


  const [addMemberModal,setAddMemberModal] = useState(false)
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

  // group message......................

  // join selected group

  useEffect(() => {
    if (!socket || !selectedGroup) return;
    socket.emit("joingroup", selectedGroup._id);
    console.log("Joined Group:", selectedGroup._id);
  }, [socket, selectedGroup]);

  // recieve group messages

  useEffect(() => {
    if (!socket) return;

    socket.on("recieveGroupMsg", (newmessage) => {
      console.log("new group msgs", newmessage);
      setGroupmessages((prev) => [...prev, newmessage]);
    });

    return () => {
      socket.off("recieveGroupMsg");
    };
  }, [socket]);

  // send group messages

  const sendgroupMessages = () => {
    if (!groupText.trim() || !selectedGroup) return;
    socket.emit("sendGroupMsg", {
      groupid: selectedGroup._id,
      senderid: currentuserid,
      text: groupText,
    });
    setGroupText("");

    console.log("groiupid",selectedGroup._id);
    console.log("senderid",currentuserid);
    console.log(" group text",groupText);
    
    
    
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
        setSelectedGroup,

        groupmessages,
        setGroupmessages,

        groupText,
        setGroupText,

        sendgroupMessages,

        addMemberModal,
        setAddMemberModal
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide = () => useContext(ChatContext);

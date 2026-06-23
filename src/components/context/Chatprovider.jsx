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
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchData, setSearchData] = useState("");

  const [addMemberModal, setAddMemberModal] = useState(false);
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
  // const lastGroupRef = useRef(null);
  useEffect(() => {
    if (!socket || !selectedGroup?._id) return;
    setGroupmessages([]);

    socket.emit("joingroup", selectedGroup._id);
    console.log("Joined Group:", selectedGroup._id);
  }, [socket, selectedGroup?._id]);

  // recieve group messages

  useEffect(() => {
    if (!socket) return;

    const handler = (newmessage) => {
      console.log("new group msgs", newmessage);
      setGroupmessages((prev) => {
        const exists = prev.some((m) => m._id === newmessage._id);
        if (exists) return prev;
        return [...prev, newmessage];
      });
      // setGroupmessages((prev) => [...prev, newmessage]);
    };
    // socket.off("recieveGroupMsg");
    socket.on("recieveGroupMsg", handler);

    return () => {
      socket.off("recieveGroupMsg", handler);
    };
  }, [socket]);

  // send group messages

  const sendgroupMessages = () => {
    if (!socket) return;
    if (!groupText.trim() || !selectedGroup) return;

    const sendGrpMsgs = {
      groupid: selectedGroup._id,
      senderid: currentuserid,
      text: groupText,
    };
    socket.emit("sendGroupMsg", sendGrpMsgs);
    // setGroupmessages((prev)=>[...prev,sendGrpMsg])
    setGroupText("");

    console.log("groiupid", selectedGroup._id);
    console.log("senderid", currentuserid);
    console.log(" group text:", groupText);
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
        setAddMemberModal,

        searchUsers,
        setSearchUsers,

        searchData,
        setSearchData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide = () => useContext(ChatContext);

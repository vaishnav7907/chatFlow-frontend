import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatContext = createContext();

export const Chatprovider = ({ children }) => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [isauth, setIsauth] = useState(false);

  //onlineusers
  const [onlineUsers, setOnlineUsers] = useState([]);
  //personal chat

  const [message, setMessage] = useState([]);
  const [messagesubmit, setMessagesubmit] = useState("");

  const [allusers, setAllusers] = useState([]);
  const [socket, setSocket] = useState(null);

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

  // all group and and personal chats display
  const [allchaats, setAllchaats] = useState([]);

  //currentuserid
  const currentuserid = localStorage.getItem("userId");

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !currentuserid) return;
    socket.emit("join", currentuserid);
  }, [socket, currentuserid]);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("recievemessage", (newMsg) => {
  //     console.log("NEW MESSAGE:", newMsg);
  //     setMessage((prev) => [...prev, newMsg]);

  //     //for get all chats
  //     const senderr = allusers.find(
  //       (u) => String(u._id) === String(newMsg.senderid),
  //     );

  //     if (senderr) {
  //       setAllchaats((prev) => {
  //         const filtered = prev.filter((chat) => chat._id !== senderr._id);
  //         return [
  //           {
  //             _id: senderr._id,
  //             Username: senderr.Username,
  //             lastMessage: newMsg.text,
  //           },
  //           ...filtered,
  //         ];
  //       });
  //     }
  //   });

  //   return () => {
  //     socket.off("recievemessage");
  //   };
  // }, [socket, allusers]);

  useEffect(() => {
    if (!socket) return;

    const handler = (newMsg) => {
      console.log("NEW MESSAGE:", newMsg);

      setMessage((prev) => [...prev, newMsg]);

      // ======== ADDED FOR ALL CHATS ========

      const chatUserId =
        String(newMsg.senderid) === String(currentuserid)
          ? newMsg.recieverid
          : newMsg.senderid;

      const senderr = allusers.find(
        (u) => String(u._id) === String(chatUserId),
      );
      // const senderr = allusers.find(
      //   (u) => String(u._id) === String(newMsg.senderid),
      // );

      if (senderr) {
        setAllchaats((prev) => {
          const filtered = prev.filter((chat) => chat._id !== senderr._id);

          return [
            {
              _id: senderr._id,
              Username: senderr.Username,
              lastMessage: newMsg.text,
              createdAt: newMsg.createdAt,
            },
            ...filtered,
          ];
        });
      }
      // ======== END ========
    };

    socket.on("recievemessage", handler);

    return () => {
      socket.off("recievemessage", handler);
    };
  }, [socket, allusers,currentuserid]);

  //recieve online users
  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (users) => {
      console.log("ONLINE USERS:", users);
      setOnlineUsers(users);
    });
    return () => socket.off("onlineUsers");
  }, [socket]);

  const sendmessage = () => {
    if (!messagesubmit.trim() || !selecteduser) return;

    socket.emit("sendmessage", {
      senderid: currentuserid,
      recieverid: selecteduser._id,
      text: messagesubmit,
    });
    // ===== ADDED =====
    setAllchaats((prev) => {
      const filtered = prev.filter((chat) => chat._id !== selecteduser._id);

      return [
        {
          _id: selecteduser._id,
          Username: selecteduser.Username,
          lastMessage: messagesubmit,
          createdAt: new Date(),
        },
        ...filtered,
      ];
    });
    // ===== END =====
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

    const handlerr = (newmessage) => {
      console.log("new group msgs", newmessage);
      setGroupmessages((prev) => {
        const exists = prev.some((m) => m._id === newmessage._id);
        if (exists) return prev;
        return [...prev, newmessage];
      });
      // setGroupmessages((prev) => [...prev, newmessage]);

      //for get all chat
      const groupp = getallgroups.find(
        (g) => String(g._id) === String(newmessage.groupid),
      );
      if (groupp) {
        setAllchaats((prev) => {
          const filtered = prev.filter((chat) => chat._id !== groupp._id);
          return [
            {
              _id: groupp._id,
              groupname: groupp.groupname,
              lastMessage: newmessage.text,
              createdAt: newmessage.createdAt,
            },
            ...filtered,
          ];
        });
      }
    };
    // socket.off("recieveGroupMsg");
    socket.on("recieveGroupMsg", handlerr);

    return () => {
      socket.off("recieveGroupMsg", handlerr);
    };
  }, [socket, getallgroups]);

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

    //for gett allchats

    setAllchaats((prev) => {
      const filtered = prev.filter((chat) => chat._id !== selectedGroup._id);
      return [
        {
          _id: selectedGroup._id,
          groupname: selectedGroup.groupname,
          lastMessage: groupText,
          createdAt: new Date(),
        },
        ...filtered,
      ];
    });
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

        onlineUsers,

        allchaats,
        setAllchaats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide = () => useContext(ChatContext);

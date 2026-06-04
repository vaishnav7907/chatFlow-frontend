import { createContext, useContext, useState } from "react";
import { data } from "react-router-dom";
import { io } from "socket.io-client";

const ChatContext = createContext();

export const Chatprovider = ({ children }) => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isauth, setIsauth] = useState(false);
  const [socket, setSocket] = useState(null);
  const [gotochat, setGotochat] = useState(false);
  const [message, setMessage] = useState([]);
  const [messagesend, setMessagesend] = useState(null);
  const [messagesubmit, setMessagesubmit] = useState("");
  const [selecteduser, setSelecteduser] = useState(null);
  const [allusers, setAllusers] = useState([]);
  const connectSocket = (userId) => {
    if (socket) return;
    const newSocket = io(import.meta.env.VITE_API_URL);
    newSocket.on("connect", () => {
      console.log("user connected", newSocket.id);

      newSocket.emit("join_room", userId);
    });

    //incoming messags
    newSocket.on("recieve_message", (data) => {
      console.log("message recieved:", data);
      setMessage((prev) => [...prev, data]);
    });

    setSocket(newSocket);
  };

  const sendmessages = () => {
    if (!socket) {
      console.log("socket is not connected");
      return;
    }
    if (!selecteduser) {
      console.log("no users selected");
      return;
    }

    if (!messagesubmit.trim()) {
      console.log("message is empty");
      return;
    }

    const messagedata = {
      receiverid: selecteduser._id,
      text: messagesubmit,
    };

    socket.emit("send_message", messagedata);
    setMessage((prev) => [...prev, messagedata]);
    setMessagesubmit("");

    console.log("messagedata:",selecteduser._id);
    
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
        connectSocket,
        socket,
        gotochat,
        setGotochat,
        message,
        setMessage,
        messagesend,
        setMessagesend,
        messagesubmit,
        setMessagesubmit,
        allusers,
        setAllusers,
        setSelecteduser,
        sendmessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide = () => useContext(ChatContext);

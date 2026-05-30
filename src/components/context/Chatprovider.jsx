
import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const ChatContext = createContext();

export const Chatprovider = ({ children }) => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isauth, setIsauth] = useState(false);
  const [socket,setSocket]=useState(null)

  const connectSocket = () => {
    
    if(socket)return
    const newSocket = io(import.meta.env.VITE_API_URL);
    newSocket.on("connect",()=>{
      console.log("user connected",newSocket.id);
      
    })

    setSocket(newSocket)
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
        socket
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide = () => useContext(ChatContext);

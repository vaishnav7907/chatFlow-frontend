import { createContext, useContext, useState } from "react";

const ChatContext = createContext();


export const Chatprovider = ({ children }) => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
   const [isauth,setIsauth]=useState(false)
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
        setIsauth
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatprovide=()=>useContext(ChatContext)
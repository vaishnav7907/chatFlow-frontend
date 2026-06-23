import { useState } from "react";
import "./App.css";
import Welcomepage from "./components/authentication/welcomepage/Welcomepage";
import Authpage from "./components/authentication/authpage/Authpage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signin from "./components/authentication/signin/Signin";
import Signup from "./components/authentication/signup/Signup";
import Maindashboard from "./components/dashboard/maindashboard/Maindashboard";
import Chatsidebar from "./components/dashboard/chatsidebar/Chatsidebar";
import Allchats from "./components/dashboard/dashboardpages/allchats/Allchats";
import Groupchats from "./components/dashboard/dashboardpages/groups/Groupchats";
import Contactchat from "./components/dashboard/dashboardpages/contacts/Contactchat";
import { Chatprovider } from "./components/context/Chatprovider";
import Contentchat from "./components/dashboard/contentChat/Contentchat";
import ChatArea from "./components/dashboard/contentChat/ChatArea";
import Startmessage from "./components/dashboard/contentChat/Startmessage";
import GroupProfile from "./components/dashboard/dashboardpages/groups/GroupProfile";

function App() {
  const [count, setCount] = useState(0);

  const [isauth, setIsauth] = useState(false);

  return (
    <div>
      <Chatprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcomepage />} />
            <Route
              path="/authentication"
              element={!isauth ? <Authpage /> : <Navigate to={"/dashboard"} />}
            >
              <Route index element={<Signin tohome={setIsauth} />} />
              <Route
                path="signup"
                element={<Signup todashboard={setIsauth} />}
              />
            </Route>

            <Route
              path="/dashboard"
              element={
                isauth ? <Maindashboard /> : <Navigate to={"/authentication"} />
              }
            >
              <Route index element={<Allchats />} />
              <Route path="groupchat" element={<Groupchats />} />
              <Route path="contactchats" element={<Contactchat />} /> 
            </Route>

            <Route path="/chatbar" element={<Chatsidebar />} />
            <Route path="/groupProfile" element={<GroupProfile />} />
          </Routes>
        </BrowserRouter>
      </Chatprovider>
    </div>
  );
}

export default App;

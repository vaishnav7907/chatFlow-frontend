import { useState } from "react";
import "./App.css";
import Welcomepage from "./components/authentication/welcomepage/Welcomepage";
import Authpage from "./components/authentication/authpage/Authpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/authentication/signin/Signin";
import Signup from "./components/authentication/signup/Signup";
import Maindashboard from "./components/dashboard/maindashboard/Maindashboard";
import Chatsidebar from "./components/dashboard/chatsidebar/Chatsidebar";
import Allchats from "./components/dashboard/dashboardpages/allchats/Allchats";
import Groupchats from "./components/dashboard/dashboardpages/groups/Groupchats";
import Contactchat from "./components/dashboard/dashboardpages/contacts/Contactchat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="/authentication" element={<Authpage />}>
            <Route index element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          // App.jsx or Routes file
          <Route path="/dashboard" element={<Maindashboard />}>
            <Route index element={<Allchats />} />
            <Route path="groupchat" element={<Groupchats />} />
            <Route path="contactchats" element={<Contactchat />} />
          </Route>
          <Route path="/chatbar" element={<Chatsidebar />} />
          {/* <Route path="/chatbar" element={<Chatsidebar />}>
            <Route index element={<Allchats />} />
            <Route path="groupchat" element={<Groupchats />} />
            <Route path="contactchats" element={<Contactchat />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

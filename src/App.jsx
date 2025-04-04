import React from "react";
import Header from "./pages/Header";
import LeftSidebar from "./pages/LeftSideBar";
import RightSidebar from "./pages/RightSidebar";
import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { initializeApp } from "firebase/app";
import { Route, Routes } from "react-router-dom";

const App = () => {

const firebaseConfig = {
  apiKey: "AIzaSyCtYAlGey-oqHOnwKJdF3ZM-oMSr1MybOc",
  authDomain: "facebook-clone-7efe8.firebaseapp.com",
  projectId: "facebook-clone-7efe8",
  storageBucket: "facebook-clone-7efe8.firebasestorage.app",
  messagingSenderId: "903247504648",
  appId: "1:903247504648:web:9cf82055f2c9bfc15478bd"
};
const app = initializeApp(firebaseConfig);

  return (
    <div className="h-screen flex flex-col">
      {/* <div className="sticky top-0 left-0 w-full bg-white z-50 shadow-md">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Home />
        </div>
        <RightSidebar />
      </div> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        </Routes>
    </div>
  );
};

export default App;

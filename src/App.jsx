import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import LeftSidebar from "./pages/LeftSideBar";
import RightSidebar from "./pages/RightSidebar";
import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { initializeApp } from "firebase/app";
import { GlobalContext } from "./pages/context/Context";

const firebaseConfig = {
  apiKey: "AIzaSyCtYAlGey-oqHOnwKJdF3ZM-oMSr1MybOc",
  authDomain: "facebook-clone-7efe8.firebaseapp.com",
  projectId: "facebook-clone-7efe8",
  storageBucket: "facebook-clone-7efe8.appspot.com",
  messagingSenderId: "903247504648",
  appId: "1:903247504648:web:9cf82055f2c9bfc15478bd",
};
initializeApp(firebaseConfig);

const App = () => {
  const { state } = useContext(GlobalContext);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (!state.isLogin && !isAuthPage) {
    return <Navigate to="/login" />;
  }

  if (state.isLogin && isAuthPage) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen flex flex-col">
      {state.isLogin && (
        <div className="sticky top-0 left-0 w-full bg-white z-50 shadow-md">
          <Header />
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        {state.isLogin && <LeftSidebar />}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Routes>
            {state.isLogin && <Route path="/" element={<Home />} />}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        {state.isLogin && <RightSidebar />}
      </div>
    </div>
  );
};

export default App;

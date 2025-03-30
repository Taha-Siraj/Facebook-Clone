import React from "react";
import Header from "./pages/Header";
import LeftSidebar from "./pages/LeftSideBar";
import RightSidebar from "./pages/RightSidebar";
import Home from "./Home";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 left-0 w-full bg-white z-50 shadow-md">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Home />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default App;

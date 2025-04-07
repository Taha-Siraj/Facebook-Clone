import React, { useContext } from "react";
import { FaUserFriends, FaSave, FaGamepad, FaStore, FaCalendarAlt } from "react-icons/fa";
import { MdGroups, MdOutlineOndemandVideo, MdOutlineAdsClick } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsClock } from "react-icons/bs"; 
import { GlobalContext } from "./context/Context";

const SidebarItem = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
      <span className="text-2xl">{icon}</span>
      <span className="text-lg">{text}</span>
    </div>
  );
};

const LeftSidebar = () => {
  const {state ,  dispatch} = useContext(GlobalContext)
  return (
    <div className="hidden lg:flex flex-col w-[280px] h-screen bg-white p-4 shadow-md overflow-y-auto">
      <div className="flex items-center gap-x-2 mb-4">
        <img src={state?.user?.photoURL} className="rounded-full h-12 w-12  object-cover text-3xl text-gray-700" />
        <span className="text-lg font-medium">{state.user.displayName}</span>
      </div>

      <div className="flex flex-col gap-y-4 text-gray-700">
        <SidebarItem icon={<FaUserFriends />} text="Friends" />
        <SidebarItem icon={<BsClock />} text="Memories" />
        <SidebarItem icon={<MdGroups />} text="Groups" />
        <SidebarItem icon={<MdOutlineOndemandVideo />} text="Watch" />
        <SidebarItem icon={<FaSave />} text="Saved" />
        <SidebarItem icon={<FaStore />} text="Marketplace" />
        <SidebarItem icon={<FaGamepad />} text="Gaming" />
        <SidebarItem icon={<FaCalendarAlt />} text="Events" />
        <SidebarItem icon={<MdOutlineAdsClick />} text="Ads Center" />
      </div>
    </div>
  );
};

export default LeftSidebar;

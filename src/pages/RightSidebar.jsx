import React from "react";
import { FaVideo, FaSearch, FaEllipsisH } from "react-icons/fa";

const RightSidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-[300px] h-screen bg-white p-4 shadow-md overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Contacts</h2>
        <div className="flex items-center gap-x-2 text-gray-600">
          <FaVideo className="cursor-pointer" />
          <FaSearch className="cursor-pointer" />
          <FaEllipsisH className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <Contact name="John Doe" img="https://i.pravatar.cc/40?img=1" online />
        <Contact name="Sarah Smith" img="https://i.pravatar.cc/40?img=2" online />
        <Contact name="Michael Brown" img="https://i.pravatar.cc/40?img=3" />
        <Contact name="Emily Davis" img="https://i.pravatar.cc/40?img=4" online />
        <Contact name="Daniel White" img="https://i.pravatar.cc/40?img=5" />
        <Contact name="Olivia Wilson" img="https://i.pravatar.cc/40?img=6" />
      </div>
    </div>
  );
};
const Contact = ({ name, img, online }) => {
  return (
    <div className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
      <div className="relative">
        <img src={img} alt={name} className="w-10 h-10 rounded-full" />
        {online && <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>}
      </div>
      <span className="text-gray-800">{name}</span>
    </div>
  );
};
export default RightSidebar;

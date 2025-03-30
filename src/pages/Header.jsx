import React, { useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { CgMenuGridR } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  return (
    <div className='bg-[#F2F4F7]'>
      <div className='h-[65px] py-2 px-4 flex items-center bg-[#FFFFFF] border-b border-[#E4E6EB] justify-between '>
      <div className="flex items-center gap-x-4">
  <FaFacebook className="text-5xl text-blue-600" />
    <div className="relative w-full">
    <input
      type="text"
      className="py-3 px-12 rounded-full outline-none w-full bg-[#F0F2F5] text-gray-700"
      placeholder="Search Facebook"
    />
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6E7175] text-2xl">
        <CiSearch />
        </span>
      </div>
    </div>
        <div className='flex items-center justify-center gap-x-2 text-3xl'>
            <span  className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg   cursor-pointer hover:text-blue-600 ' 
           ><GoHomeFill/></span> 
            <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg hover:text-blue-600'><FaUserFriends/></span>
            <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8  rounded-lg hover:text-blue-600'><FaBoxOpen/></span>
            <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8  rounded-lg hover:text-blue-600'><MdGroups/></span>
            <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg hover:text-blue-600'><FaGamepad/></span>
        </div>
        <div className='flex items-center justify-center gap-x-3'>
            <span className='bg-[#E2E5E9] rounded-full py-2 px-2 text-3xl hover:text-blue-600' ><CgMenuGridR/></span>
            <span className='bg-[#E2E5E9] hover:text-blue-600 rounded-full py-2 px-2 text-3xl'><FaFacebookMessenger/></span>
            <span className='bg-[#E2E5E9] hover:text-blue-600 rounded-full py-2 px-2 text-3xl'><IoMdNotifications/></span>
            <span className='bg-[#E2E5E9] hover:text-blue-600 rounded-full py-2 px-2 text-3xl'><CgProfile/></span>
        </div>
      </div>
    </div>
  )
}

export default Header

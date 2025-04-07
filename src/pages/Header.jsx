import React, { useContext, useEffect, useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalContext } from './context/Context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName || 'Anonymous',
          email: user.email || '',
          photoURL: user.photoURL || 'https://via.placeholder.com/50',
          uid: user.uid,
        });
        dispatch({ type: "USER_LOGIN", payload: user });
      } else {
        setUser(null);
        dispatch({ type: "USER_LOGOUT" });
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        dispatch({ type: "USER_LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className='bg-[#F2F4F7]'>
      <div className='h-[65px] py-2 px-4 flex items-center bg-[#FFFFFF] border-b border-[#E4E6EB] justify-between'>
        {/* Left Section */}
        <div className="flex items-center gap-x-4">
          <FaFacebook className="text-5xl text-blue-600" />
          <div className="relative w-64">
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

        {/* Middle Section */}
        <div className='flex items-center justify-center gap-x-2 text-3xl'>
          <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg cursor-pointer hover:text-blue-600'>
            <GoHomeFill />
          </span>
          <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg cursor-pointer hover:text-blue-600'>
            <FaUserFriends />
          </span>
          <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg cursor-pointer hover:text-blue-600'>
            <FaBoxOpen />
          </span>
          <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg cursor-pointer hover:text-blue-600'>
            <MdGroups />
          </span>
          <span className='text-[#606366] hover:bg-[#F2F2F2] py-2 px-8 rounded-lg cursor-pointer hover:text-blue-600'>
            <FaGamepad />
          </span>
        </div>

        {/* Right Section */}
        <div className='relative flex items-center justify-center gap-x-3'>
          <span className='bg-[#E2E5E9] rounded-full py-2 px-2 text-3xl hover:text-blue-600 cursor-pointer'>
            <CgMenuGridR />
          </span>
          <span className='bg-[#E2E5E9] rounded-full py-2 px-2 text-3xl hover:text-blue-600 cursor-pointer'>
            <FaFacebookMessenger />
          </span>
          <span className='bg-[#E2E5E9] rounded-full py-2 px-2 text-3xl hover:text-blue-600 cursor-pointer'>
            <IoMdNotifications />
          </span>

          <div className="relative">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/50'}
              alt="User Profile"
              className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
              onClick={() => setIsShow((prev) => !prev)}
            />
            
            {isShow && user && (
              <div className="absolute top-[60px] right-0 bg-white shadow-md rounded-lg w-[250px] py-4 px-4 z-20">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/50'}
                    alt="User"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="font-semibold capitalize text-2xl">
                      {user.displayName}
                    </h1>
                    <h2 className="text-lg text-gray-600">{user.email}</h2>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full py-2 px-3 bg-blue-600 text-white font-mono font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
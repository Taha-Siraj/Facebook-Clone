import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { GlobalContext } from './context/Context';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile   } from "firebase/auth";
const Signup = () => {
  const {state, dispatch} = useContext(GlobalContext);
  const [firstName , setfirstName ] = useState("");
  const [LastName , setLastName ] = useState("");
  const [email , setEmail] = useState("");
  const [password , setpassword] = useState("");
  const [photo , setPhoto] = useState(null);
  const [photoURL , setphotoURL ] = useState();
  const navigate = useNavigate()
  console.log("states",state)
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); 
      setPhoto(file); 
      setphotoURL(fileURL);
    }
  }
  const createUsers = () => {
    if(!firstName || !LastName || !email || !password){
       toast.warn('Fill the input field !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
        });
      return;
    }
    else if(!photoURL){
      toast.warn('Select The Profile Photo!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("users", user)
    setphotoURL(user.photoURL)
    updateProfile(auth.currentUser, {
    displayName: `${firstName} ${LastName}`,
    photoURL: photo ? String(photo) : null,
    }).then(() => {
      console.log("updated profile")
    }).catch((error) => {
      console.log("profile error",error);
    });
    setfirstName("");
    setLastName("");
    setEmail("");
    setpassword("");
    setPhoto(null);
    setphotoURL(null);
    dispatch({type: "USER_LOGIN", payload: {user}});
    toast.success('Fill the input field !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate("/login")  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error", error ,errorMessage);
    firstName("");
    LastName("");
    email("");
    password("");
    photo("")
  });
  }
  return (
    <div className='bg-[#F0F2F5] min-h-[120vh] flex flex-col justify-center items-center'>
       <ToastContainer
      position="top-right"x
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />
      <h1 className='text-6xl text-blue-600 font-bold mb-4'>facebook</h1>
      <div className='bg-white p-6 rounded-lg shadow-md w-[450px]'>
        <h2 className='text-2xl font-semibold text-center'>Create a new account</h2>
        <p className='text-center text-gray-600'>It's quick and easy.</p>
        <hr className='my-4' />
        <div className='flex flex-col gap-3'>
          <div className='flex gap-3'>
            <input type='text' value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder='First Name' className='w-1/2 p-2 border border-gray-300 rounded-md' />
            <input type='text' value={LastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} className='w-1/2 p-2 border border-gray-300 rounded-md' />
          </div>
          <input value={email} type='email' placeholder='Email or Phone' onChange={(e) => setEmail(e.target.value)} className='p-2 border border-gray-300 rounded-md w-full' />
          <input
           value={password}
           onChange={(e) => setpassword(e.target.value)}  
            type='password' placeholder='New Password' className='p-2 border border-gray-300 rounded-md w-full' />
          <div>
            <label className='text-gray-700'>Date of birth</label>
            <input type='date'className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div>
            <label className='text-gray-700'>Select Your photo</label>
            <input onChange={handlePhotoUpload} type='file'className=' w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <img 
            src={photoURL} 
            className={`h-[100px] object-top w-[100px] ${!photoURL ? "hidden": "visible"} rounded-full object-cover mx-auto`} 
          />
          <button onClick={createUsers} className='bg-green-600 text-white py-2 rounded-md font-semibold mt-2 hover:bg-green-700'>Sign Up</button>
          <p><Link  className='text-[#1877F4] font-mono' to="/login">Already have an account?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
import React, { useContext, useEffect, useState } from 'react'
import { BiShow , BiHide } from "react-icons/bi";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { GlobalContext } from './context/Context';
const Login = () => {
  const {state, dispatch} = useContext(GlobalContext);
    const [isshow , setIsShow] = useState(false);
    const [email , setEmail] = useState("");
    const [password , setpassword] = useState("");
    const [loading , setLoading] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate()
    const loginForm = () => {
      if(!password || !email){
        toast.warn('Fill the input field!', {
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
     setLoading(true)
     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       console.log("user" , user)
       setLoading(false)
       dispatch({type: "USER_LOGIN", payload: user})
       navigate("/")
       console.log("user login" , user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error login" , errorMessage)
        toast.error('Invalid User', {
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
          setLoading(false)
          return; 
      });
    }

   
    
    useGSAP(() => {
       let tl = gsap.timeline()
     tl.from("#text", {
        scale: 1.5,
        opacity: 0,
        duration: 1,
    })
    tl.from("#box", {
        scale: 1.5,
        opacity: 0,
        duration: 1,
    })
    })
  return (
    <div>
      <ToastContainer
      position="top-right"
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
      <div className='py-4 bg-[#F2F4F7] h-screen w-[100%] md:flex items-center justify-between px-44'>
        <div id='text' className=' flex flex-col gap-y-3'>
            <h1 className='text-6xl text-blue-600 font-semibold'>facebook</h1>
            <p className=' text-[30px]'>Facebook helps you connect and share <br /> with the people in your life.</p>
        </div>
        <div id='box' className='h-[350px] w-[400px] bg-[#fff] py-3 px-4 flex flex-col gap-y-3 rounded-xl justify-between items-center capitalize relative'>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder='Email address'
            className='py-3 px-4 border  border-[#DDDFE2] rounded-md w-full focus:outline-blue-500 text-[18px]'/>
            <input 
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type={isshow ? "text" : "password"} 
            placeholder='password' 
            className='py-3 px-4 border  border-[#DDDFE2] rounded-md w-full focus:outline-blue-500 outline-1 text-[18px] '
             required  />

           {(!password) ? null
           :<span className='text-[23px] absolute cursor-pointer top-[100px] right-7' onClick={() => setIsShow((prev) => !prev)} > {isshow ? <BiShow/>  : <BiHide/>} </span>  }

            <button   className='w-full  px-4 bg-[#0866FF] text-white font-semibold rounded-md py-3 text-xl' onClick={loginForm} > { loading ? <ClipLoader/> : "Login" } </button>
            <a href="" className='text-[#0866FF]'>Forgot Password?</a>
            <hr className='w-full  text-black' />
            <button  className=' px-4 bg-[#42B72A] text-white font-semibold rounded-md py-3 text-xl'> <Link to="/signup"> Create new account</Link> </button>
        </div>
      </div>
    </div>
  )
}

export default Login

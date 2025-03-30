import React, { useEffect, useState } from 'react'
import { BiShow , BiHide } from "react-icons/bi";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Timeline } from 'gsap/gsap-core';
const Login = () => {
    const [isshow , setIsShow] = useState(false);
    const [email , setEmail] = useState("");
    const [password , setpassword] = useState("");

    useGSAP(() => {
       let tl = gsap.timeline()
     tl.from("#text", {
        y: -400,
        opacity: 0,
        duration: 1,
    })
    tl.from("#box", {
        y: -400,
        opacity: 0,
        duration: 1,
    })
    })

  return (
    <div>
      <div className='px-5 py-4 bg-[#F2F4F7] h-screen w-[100%] md:flex items-center justify-center gap-x-5'>
        <div id='text'>
            <h1 className='text-6xl text-blue-600 font-semibold'>facebook</h1>
            <p className=' text-[32px]'>Facebook helps you connect and share <br /> with the people in your life.</p>
        </div>
        <div id='box' className='h-[350px] w-[400px] bg-[#fff] py-3 px-4 flex flex-col gap-y-3 rounded-xl justify-between items-center capitalize relative'>
            <input 
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder='Email address'
            className='py-3 px-4 border  border-[#DDDFE2] rounded-md w-full focus:outline-blue-500 text-[18px]'/>
            <input 
            type={isshow ? "text" : "password"} 
            placeholder='password' 
            className='py-3 px-4 border  border-[#DDDFE2] rounded-md w-full focus:outline-blue-500 outline-1 text-[18px] '
             required  />
            <span className='text-[23px] absolute cursor-pointer top-[100px] right-7' onClick={() => setIsShow((prev) => !prev)} > {isshow ? <BiShow/>  : <BiHide/>} </span>
            <button  className='w-full  px-4 bg-[#0866FF] text-white font-semibold rounded-md py-3 text-xl'>Login</button>
            <a href="" className='text-[#0866FF]'>Forgot Password?</a>
            <hr className='w-full  text-black' />
            <button  className=' px-4 bg-[#42B72A] text-white font-semibold rounded-md py-3 text-xl'>Create new account</button>
        </div>
      </div>
    </div>
  )
}

export default Login

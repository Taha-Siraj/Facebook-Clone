import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { GlobalContext } from './context/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Signup = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [firstName, setfirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [dOB, setDateofBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUsers = () => {
    if (!firstName || !LastName || !email || !password) {
      toast.warn('Fill the input field!', {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const auth = getAuth();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: `${firstName} ${LastName}`,
          photoURL: "https://rb.gy/ddnepk"
        }).then(async () => {
          await auth.currentUser.reload();
          const updatedUser = getAuth().currentUser;

          dispatch({
            type: "USER_LOGIN",
            payload: {
              isLogin: true,
              user: {
                name: `${firstName} ${LastName}`,
                email: updatedUser.email,
                uid: updatedUser.uid,
                photoURL: updatedUser.photoURL,
                dOB: dOB
              }
            }
          });

          toast.success('Account created successfully!', {
            position: "top-right",
            autoClose: 1000,
            theme: "light",
            transition: Bounce,
          });

          setfirstName("");
          setLastName("");
          setEmail("");
          setpassword("");
          setLoading(false);
          navigate("/");
        }).catch((error) => {
          console.log("profile error", error);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log("error", error.message);
        setfirstName("");
        setLastName("");
        setEmail("");
        setpassword("");
        setLoading(false);
      });
  };

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from("#text", {
      scale: 1.5,
      opacity: 0,
      delay: 0.5,
      duration: 1,
    }).from("#boxes", {
      scale: 1.5,
      opacity: 0,
      duration: 1,
    });
  });

  return (
    <div className='bg-[#F0F2F5] min-h-[120vh] flex flex-col justify-center items-center'>
      <ToastContainer />
      <h1 id='text' className='text-6xl text-blue-600 font-bold mb-4'>facebook</h1>
      <div id='boxes' className='bg-white p-6 rounded-lg shadow-md w-[450px]'>
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
            <input onChange={(e) => setDateofBirth(e.target.value)} type='date' className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <button onClick={createUsers} className='bg-green-600 text-white py-2 rounded-md font-semibold mt-2 hover:bg-green-700'>
            {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
          </button>
          <p><Link className='text-[#1877F4] font-mono' to="/login">Already have an account?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

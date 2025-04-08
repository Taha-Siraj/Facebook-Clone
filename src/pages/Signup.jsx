import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from './context/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { OrbitProgress } from 'react-loading-indicators';

const Signup = () => {
  const { dispatch } = useContext(GlobalContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dOB, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUsers = () => {
   
    setLoading(true);
    console.log('Loading set to true'); 

    if (!firstName || !lastName || !email || !password) {
      toast.warn('Please fill all input fields!', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
        transition: Bounce,
      });
      setTimeout(() => setLoading(false), 1000); 
      return;
    }

    const auth = getAuth();


    setTimeout(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            photoURL: 'https://rb.gy/ddnepk',
          })
            .then(async () => {
              await auth.currentUser.reload();
              const updatedUser = getAuth().currentUser;

              dispatch({
                type: 'USER_LOGIN',
                payload: {
                  isLogin: true,
                  user: {
                    name: `${firstName} ${lastName}`,
                    email: updatedUser.email,
                    uid: updatedUser.uid,
                    photoURL: updatedUser.photoURL,
                    dOB: dOB,
                  },
                },
              });

              toast.success('Account created successfully!', {
                position: 'top-right',
                autoClose: 1000,
                theme: 'light',
                transition: Bounce,
              });

              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setLoading(false);
              navigate('/');
            })
            .catch((error) => {
              console.error('Profile update error:', error);
              toast.error('Profile update failed.', {
                position: 'top-right',
                autoClose: 1000,
                theme: 'light',
                transition: Bounce,
              });
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Signup error:', error.message);
          toast.error('Signup failed: ' + error.message, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
            transition: Bounce,
          });
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setLoading(false);
        });
    }, 2000);
  };

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from('#text', {
      scale: 1.5,
      opacity: 0,
      delay: 0.5,
      duration: 1,
    }).from('#boxes', {
      scale: 1.5,
      opacity: 0,
      duration: 1,
    });
  });

  return (
    <div className="bg-[#F0F2F5] min-h-[100vh] flex flex-col justify-center items-center">
      <ToastContainer />
      <h1 id="text" className="text-6xl text-blue-600 font-bold mb-4">
        facebook
      </h1>
      <div id="boxes" className="bg-white p-6 rounded-lg shadow-md w-[450px]">
        <h2 className="text-2xl font-semibold text-center">Create a new account</h2>
        <p className="text-center text-gray-600">It's quick and easy.</p>
        <hr className="my-4" />
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label className="text-gray-700">Date of birth</label>
            <input
              type="date"
              value={dOB}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="w-full px-4 bg-[#0866FF] text-white font-semibold rounded-md py-3 text-xl flex items-center justify-center"
            onClick={createUsers}
          >
            {loading ? (
              <div className="flex items-center justify-center h-6">
                <OrbitProgress color="#ffffff" size="small" text="" textColor="" />
              </div>
            ) : (
              "Signup"
            )}
          </button>
          <p className="text-center">
            <Link className="text-[#1877F4] font-mono hover:underline" to="/login">
              Already have an account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
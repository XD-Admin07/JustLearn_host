import React, { useState } from 'react'
import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth";
import {app} from './../../../../src/firebase';
import { useDispatch } from 'react-redux';
import {setToken, signInSuccess} from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setUser } from "../../../slices/profileSlice";
import { FcGoogle } from "react-icons/fc";
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { endpoints } from '../../../services/apis';

export default function OAuth() {
    const{GOOGLE_API} =endpoints;
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [accounttype,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);
    const handlegoogleClick=async()=>{
      
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
      
            const result = await signInWithPopup(auth, provider);
            console.log("resultData",result)
            const res = await fetch(GOOGLE_API, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              
              body: JSON.stringify({
                //token:result.user.access,
                firstName: result.user.displayName,
                lastName:result.user.displayName,
                email: result.user.email,
                accounttype,
                photo: result.user.photoURL,
              }),
            });
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            dispatch(setToken(data.user.token))
            const userImage=data.user.image;
          dispatch(setUser({ ...data.user,image:userImage}))
        
          localStorage.setItem("token", JSON.stringify(data.user.token))
            navigate('/dashboard/my-profile');}catch(error){
            console.log("could not login with google",error);
        }
    }
  return (
     
    <button type="button" onClick={handlegoogleClick} className='bg-white text-black flex items-center justify-center h-full px-[12px] py-[8px] rounded-[8px]'>
    <FcGoogle className='mr-2 text-xl'/> Continue with Google
  </button>
  
     
  )
}


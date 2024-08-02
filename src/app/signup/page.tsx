'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function signupPage() {
  const router = useRouter()
  const [user , setUser] = useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisabled , setButtonDisabled] = useState(false)
  const [loading , setloading] = useState(false)

  const onSignup = async()=>{
    try {
      setloading(true)
      const response = await axios.post("/api/users/signup",user)

      console.log("signup success", response.data)
      
      router.push("/login")

    } catch (error:any) {
      console.error("Signup failed ",error);
      toast.error(error.message) 
      
    }
  }

  useEffect(()=>{
  if(user.email.length > 0 && user.password.length >0 && user.username.length > 0){
    setButtonDisabled(false)
  }
  else{
    setButtonDisabled(true)
  }
  },[user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2' >
      <h1>{loading? "Processing":"Signup"}</h1>
      <hr />

      <label htmlFor="username" className='my-2 '>Username</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:outline-gray-600
      text-black'
        type="text"
        id='username'
        value={user.username}
        onChange={(e)=> setUser({...user, username:e.target.value })} 
        placeholder='Enter Your Username'/>


      <label htmlFor="email" className='my-2 '>Email</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:outline-gray-600
      text-black'
        type="text"
        id='email'
        value={user.email}
        onChange={(e)=> setUser({...user, email:e.target.value })} 
        placeholder='Enter Your Email'/>

      <label htmlFor="Password" className='my-2 '>Password</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:outline-gray-600
      text-black'
        type="password"
        id='password'
        value={user.password}
        onChange={(e)=> setUser({...user, password:e.target.value })} 
        placeholder='Enter Your Password'/>

        <button
        onClick={onSignup}
        className='p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
          {buttonDisabled?"No Signup" : "Signup"}
        </button>
        <Link href="/login">
        Visit login Page
        </Link>
        

    </div>
  )
}


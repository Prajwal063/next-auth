'use client'
import React, {useEffect, useState} from 'react'
import { userAuth } from '../context/AuthContext'

const page = () => {
  const {user} = userAuth()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async() => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    }
    checkAuthentication();
  }, [user]);


  return (
    <div className='p-5 flex justify-center items-center h-screen text-center'>
    {loading ? (
      <p className='text-xl'>Loading...</p>
    ) : (
      user ? (
        <p className='text-xl'>Welcome {user.displayName}, this is the profile page after logging in</p>
      ) : (
        <p className='text-xl'>You must be logged in to view this page.</p>
      )
    )}
  </div>
  );
  
}

export default page
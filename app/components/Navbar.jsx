import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { userAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, googleSignIn, logOut } = userAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/profile">Profile</Link>
        </li>
      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Log In
          </li>
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign Up
          </li>
        </ul>
      ) : (
        <div className="flex items-center">
          <p className="mr-2">Welcome, {user.displayName}</p>
          <p onClick={handleSignOut} className="cursor-pointer">
            Sign Out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;

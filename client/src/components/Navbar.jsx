import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [pageState, setPageState] = useState("sign-in")
  const location = useLocation();
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile")
      }else {
        setPageState("Sign in")
      }
    })
  }, [auth])

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="flex justify-between items-center p-7 text-white bg-zinc-600 border-b shadow-sm sticky top-0 z-40">
      <h2 className="cursor-pointer">Logo</h2>
      <ul className="flex gap-5">
        <li
          className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
            pathMatchRoute("/") && "text-black border-b-red-500"
          }`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
            pathMatchRoute("/offers") && "text-black border-b-red-500"
          }`}
        >
          <Link to="/offers">Offers</Link>
        </li>
        <li
          className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
            (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500"
          }`}
        >
          <Link to="/profile">{pageState}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

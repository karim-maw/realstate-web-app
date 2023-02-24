import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { GoogleLogo } from "phosphor-react";
import React from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate()
  const signInGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if user already exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate("/")

    } catch (error) {
      toast.error("Couldn't authorize with google");
      console.log(error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={signInGoogle}
      className="flex items-center justify-center w-full bg-red-500 text-white py-4 rounded-lg hover:bg-red-600 active:bg-red-700 text-sm font-medium shadow-md hover:shadow-lg transition duration-150 ease-in-out"
    >
      <GoogleLogo className="text-2xl text-black bg-white rounded-full mr-2" />
      <p>Continue with Google</p>
    </button>
  );
};

export default Oauth;

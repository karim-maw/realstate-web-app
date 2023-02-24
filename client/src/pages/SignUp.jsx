import React from "react";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  //normal user email sign up

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      toast.success("Sign up was successful");
    } catch (error) {
      if (!email || !password) {
        toast.error("Check your email or your password");
      } else {
        toast.error("Your from must be valid");
      }
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap gap-3 items-center px-6 py-12">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%]">
          <form onSubmit={onSubmit}>
            <input
              className="w-full rounded-lg px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 transition ease-in-out"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full name"
            />
            <input
              className="w-full rounded-lg px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="email"
            />
            <div className="relative">
              <input
                className="w-full rounded-lg px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="password"
              />
              {showPassword ? (
                <EyeSlash
                  size={25}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword((prev) => !prev)}
                  size={25}
                  className="absolute right-3 top-3 cursor-pointer"
                />
              )}
            </div>

            <div className="flex justify-between mb-6 text-sm sm:text-lg">
              <p>
                already have an account?
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out ml-1"
                >
                  Login
                </Link>
              </p>

              <p>
                <Link
                  to="/forgot-password"
                  className="text-red-400 hover:text-red-500 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-zinc-600 text-white py-4 font-medium rounded-lg showdow-md hover:bg-zinc-500 transition duration-150 ease-in-out hover:shadow-lg active:bg-zinc-700"
            >
              Sign up
            </button>

            <div className="flex my-4 before:border-t before:flex-1 items-center before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

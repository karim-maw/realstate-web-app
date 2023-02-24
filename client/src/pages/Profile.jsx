import { getAuth, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [changeDetail, setChangeDetail] = useState(false);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const { name, email } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update the displayname in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        })
      }
      toast.success("Profile details updated")
    } catch (error) {
      toast.error("Couldn't update profile details");
    }
  };

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[30%] mt-6 px-3 py-3 bg-neutral-400 rounded-lg">
        <form>
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`w-full px-4 py-2 text-xl text-black bg-neutral-400 border-black rounded transition ease-in-out ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full px-4 py-2 my-2 text-xl text-black bg-neutral-400 border-black rounded transition ease-in-out"
          />
          <div className="flex justify-between text-sm sm:text-lg text-white mb-2">
            <p>
              Do you want to change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();

                  setChangeDetail((prev) => !changeDetail);
                }}
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 cursor-pointer"
              >
                {changeDetail ? "Apply" : "Edit"}
              </span>
            </p>
            <p
              onClick={onLogout}
              className="cursor-pointer text-blur-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              Sign out
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

import React, { useContext } from "react";
import { SignUpContext } from "../context/SignUpContext";
import Navbar from "./Navbar";


function Confirmation({infoUpdate, setInfoUpdate }) {
  const signUpData = useContext(SignUpContext);
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 bg-white py-6 mx-auto mt-[5%] w-[50%] rounded-2xl shadow-2xl px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 border-b pb-3">
          ✅ Confirmation
        </h2>

        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
          <p className="font-medium">Email:</p>
          <p>{signUpData?.email}</p>

          <p className="font-medium">Password:</p>
          <p className="truncate">{signUpData?.password}</p>

          <p className="font-medium">Full Name:</p>
          <p>{signUpData?.fullName}</p>

          <p className="font-medium">Father Name:</p>
          <p>{signUpData?.fatherName}</p>

          <p className="font-medium">Age:</p>
          <p>{signUpData?.age}</p>

          <p className="font-medium">Phone:</p>
          <p>{signUpData?.phoneNo}</p>
        </div>
        <div className="flex justify-end gap-3">
          <button 
          type="button"
          className="px-8 py-2 rounded text-white bg-blue-500"
          onClick={()=> setInfoUpdate({type:"back"})}
          >Edit</button>
          <button 
          type="submit"
          className="px-8 py-2 rounded text-white bg-[#14B20B]"
          onClick={()=> setInfoUpdate({type:"next"})}
          >Confirm</button>
        </div>
      </div>
    </>
  );
}

export default Confirmation;

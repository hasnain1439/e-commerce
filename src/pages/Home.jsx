import React from "react";
import Navbar from "../component/Navbar";
import HomeImg from "../assets/image1.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Navbar />
      <div className="px-[5%] bg-main">
        <div className="grid grid-cols-2 min-h-screen">
          {/* Left Side */}
          <div className="my-auto flex flex-col gap-4">
            <h1 className="text-6xl font-bold leading-[80px]">
              Give Your Workout <br /> A New Style
            </h1>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              reiciendis molestias quo possimus impedit, nemo numquam eveniet?
              Velit perferendis earum quisquam doloremque! Voluptate asperiores
              facilis laboriosam voluptates, nobis incidunt aspernatur?
            </p>
            <div>
              <button
                onClick={() => navigate("/about")}
                className="px-6 py-3 bg-blue-500 rounded-md text-white text-md hover:bg-red-600 transition"
              >
                Explore Now
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full flex justify-center">
            <img
              src={HomeImg}
              alt="Workout"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

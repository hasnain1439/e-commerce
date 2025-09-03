import React, { useState } from "react";

import categoryFir from "../../assets/project-Img/category-1.jpg";
import categorySec from "../../assets/project-Img/category-2.jpg";
import categoryThi from "../../assets/project-Img/category-3.jpg";
import HomeImg from "../../assets/image1.png";

import Navbar from "../../component/Navbar";

import { useNavigate } from "react-router-dom";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { UseFetch } from "../../customhooks/UseFetch";

import { addItem, countValue, price } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import AddCart from "./feature/AddCart";
import { enqueueSnackbar } from "notistack";



function Home() {
  const navigate = useNavigate();
  
  const [showHide, setShowHide] = useState(true);
  const [cartItem, setCartItems] = useState([]);
  
  const dispatch = useDispatch();
  const store = useSelector((state) => state.tasks);
  
  // Using custom hook
  const { apiData, apiErr, apiLoading, fetchingData } = UseFetch({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    autofetch: true,
  });

  // Star Rating Component
  function StarRating({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  }

  // View Detail
  const viewDetailFunction = (item) => {
    setCartItems(item);
    setShowHide(false);
  };

  // Direct add Cart
  const addToCartFunction = (itemAdd) => {
    const exists = store.some((item) => item.id === itemAdd.id);

    if (!exists) {
      dispatch(addItem(itemAdd));
      dispatch(countValue(1))
      dispatch(price(itemAdd.price));
      enqueueSnackbar("✅ This item successfully add in the cart!", {
        variant: "success",
      });
      console.log("Redux store after dispatch:", store);
    } else {
      enqueueSnackbar("❌ This item is already in the cart!", {
        variant: "error",
      });
    }

    // dispatch(addItem(item));
    // alert("hello");
  };

  return (
    <>
      {showHide === true && (
        <div className="relative">
          <Navbar />
          {/* ------------- Hero Section -------------  */}
          <div className="px-[5%] bg-gray-400">
            <div className="grid grid-cols-2 min-h-screen">
              {/* ------------- left side of Hero  -------------  */}

              <div className="my-auto flex flex-col gap-4">
                <h1 className="text-6xl font-bold leading-[80px]">
                  Give Your Workout <br /> A New Style
                </h1>
                <p className="text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  reiciendis molestias quo possimus impedit, nemo numquam
                  eveniet? Velit perferendis earum quisquam doloremque!
                  Voluptate asperiores facilis laboriosam voluptates, nobis
                  incidunt aspernatur?
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

              {/* ------------- Right side of Hero  ------------- */}

              <div className="w-full flex justify-center">
                <img
                  src={HomeImg}
                  alt="Workout"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* ------------- Categories -------------  */}

          <div className="grid grid-cols-3 gap-4 p-[5%]">
            <div className="w-full">
              <img src={categoryFir} alt="catgory-1" />
            </div>
            <div className="w-full">
              <img src={categorySec} alt="catgory-2" />
            </div>
            <div className="w-full">
              <img src={categoryThi} alt="catgory-3" />
            </div>
          </div>

          {/* ------------- Products -------------  */}

          <div className="p-[5%] bg-gray-400">
            <div className="text-center">
              <h1 className="text-5xl font-semibold">Feature Products</h1>
              <button onClick={fetchingData}>Fetch Products</button>
            </div>
            <div className="grid grid-cols-3 gap-5 pt-[48px]">
              {apiLoading && <p>Loading...</p>}
              {apiErr && (
                <p className="text-red-500">Error: {apiErr.message}</p>
              )}
              {apiData.map((items) => (
                <div
                  className="bg-gray-200 shadow-lg rounded overflow-hidden hover:cursor-pointer"
                  key={items.id}
                >
                  <img
                    src={items.image}
                    alt={items.title}
                    className="w-full h-[350px] bg-gray-300 object-contain"
                  />
                  <div className="p-5">
                    <h1 className="text-lg font-semibold truncate">
                      {items.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {items.rating.rate}
                      </span>
                      <StarRating rating={items.rating.rate} />
                      <span className="text-sm text-gray-500">
                        ({items.rating.count})
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold"> ${items.price}</h2>
                    <div className="flex gap-3">
                      <button
                        className="py-3 px-5 mt-2 rounded-md font-semibold border border-green-500 text-lg hover:bg-green-600 hover:text-white translate duration-300"
                        type="button"
                        onClick={() => viewDetailFunction(items)}
                      >
                        View Detail
                      </button>
                      <button
                        className="bg-green-600 py-3 px-5 mt-2 rounded-md font-semibold text-white text-lg"
                        type="button"
                        onClick={() => addToCartFunction(items)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showHide === false && (
        <AddCart cartItem={cartItem} setShowHide={setShowHide} />
      )}
    </>
  );
}

export default Home;

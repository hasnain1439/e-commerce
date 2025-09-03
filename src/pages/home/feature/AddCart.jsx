import React, { useReducer } from "react";
import { FaPlus, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { GrFormSubtract } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addItem, countValue } from "../../../redux/store";
import Navbar from "../../../component/Navbar";
import { enqueueSnackbar } from "notistack";

// ---------------- UseReducer ----------------
const reducer = (state, action) => {
  switch (action.type) {
    case "next":
      return { count: state.count + 1 };
    case "back":
      return { count: state.count > 0 ? state.count - 1 : 0 }; // prevent negative
    case "set":
      return { count: action.payload >= 0 ? action.payload : 0 }; // prevent negative
    default:
      return state;
  }
};

function AddCart({ cartItem, setShowHide }) {
  const [state, localDispatch] = useReducer(reducer, { count: 1 });
  const cartItems = useSelector((state) => state.tasks);
  const dispatchFun = useDispatch();

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

  const addToCartFunction = (data) => {
    const exists = cartItems.some((item) => item.id === data.id);

    if (!exists) {
      dispatchFun(addItem(data));
      dispatchFun(countValue(cartItem.id,state.count)); // ✅ save quantity in redux
      enqueueSnackbar("✅ This item successfully add in the cart!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("❌ This item is already in the cart!", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full p-[5%] bg-gray-400 relative z-1">
        <div
          className="absolute top-5 start-5"
          onClick={() => setShowHide(true)}
        >
          <IoArrowBackOutline className="text-2xl hover:cursor-pointer" />
        </div>
        <div className="grid grid-cols-[35%_65%] gap-5">
          {/* Product Image */}
          <div className="bg-gray-300 shadow-2xl rounded overflow-hidden flex items-center justify-center">
            <img
              src={cartItem.image}
              className="w-full max-h-[450px]"
              alt={cartItem.title}
            />
          </div>

          {/* Product Details */}
          <div className="p-5 bg-white">
            <h1 className="text-xl font-semibold">{cartItem.title}</h1>
            <p className="text-md py-3">{cartItem.description}</p>
            <h2 className="text-xl font-semibold">
              ${(cartItem.price * Math.max(state.count, 1)).toFixed(2)}
            </h2>

            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-400 w-max rounded mt-3">
              {/* Minus */}
              <GrFormSubtract
                className="text-3xl hover:cursor-pointer"
                onClick={() => {
                  const newValue = Math.max(state.count - 1, 0);
                  localDispatch({ type: "back" });
                  dispatchFun(countValue(cartItem.id,newValue)); 
                }}
              />

              {/* Input */}
              <input
                type="number"
                value={state.count}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  localDispatch({ type: "set", payload: newValue });
                  dispatchFun(countValue(cartItem.id,newValue)); // ✅ sync Redux
                }}
                id="productQuantity"
                className="w-20 text-center p-2 outline-none border-none"
              />

              {/* Plus */}
              <FaPlus
                className="text-2xl hover:cursor-pointer px-1"
                onClick={() => {
                  const newValue = state.count + 1;
                  localDispatch({ type: "next" });
                  dispatchFun(countValue(cartItem.id,newValue));
                  console.log("New value after plus:", newValue);
                }}
              />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg text-gray-600">
                {cartItem.rating.rate}
              </span>
              <StarRating rating={cartItem.rating.rate} />
              <span className="text-lg text-gray-500">
                ({cartItem.rating.count})
              </span>
            </div>
            <div className="mt-[5%]">
              <button
                type="button"
                className="px-4 py-2 bg-green-600 rounded-md  text-white"
                onClick={() => addToCartFunction(cartItem)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCart;

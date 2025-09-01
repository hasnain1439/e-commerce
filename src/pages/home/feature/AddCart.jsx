import React, { useReducer } from "react";
import { FaPlus, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { GrFormSubtract } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";

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
  const [state, dispatch] = useReducer(reducer, { count: 1 });

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

  return (
    <div className="w-full p-[5%] bg-gray-400 relative">
      <div className="absolute top-5 start-5" onClick={() => setShowHide(true)}>
        <IoArrowBackOutline className="text-2xl hover:cursor-pointer" />
      </div>
      <div className="grid grid-cols-[35%_65%] gap-5">
        {/* Product Image */}
        <div className="bg-gray-300 shadow-2xl hover:cursor-pointer rounded overflow-hidden flex items-center justify-center">
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
            <GrFormSubtract
              className="text-3xl hover:cursor-pointer"
              onClick={() => dispatch({ type: "back" })}
            />
            <input
              type="number"
              value={state.count}
              onChange={(e) =>
                dispatch({ type: "set", payload: Number(e.target.value) })
              }
              className="appearance-none w-14 text-center p-2 outline-none border-none"
            />
            <FaPlus
              className="text-2xl hover:cursor-pointer px-1"
              onClick={() => dispatch({ type: "next" })}
            />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg text-gray-600">
              {cartItem.rating.rate}
            </span>
            <StarRating rating={cartItem.rating.rate} className="text-4xl" />
            <span className="text-lg text-gray-500">
              ({cartItem.rating.count})
            </span>
          </div>
          <div className="mt-[5%]">
            <button
              type="button"
              className="px-4 py-2 bg-green-600 rounded-md  text-white"
            >
              Add to Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCart;

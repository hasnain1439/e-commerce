import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/store";
function CartPage() {
  const store = useSelector((state) => state.tasks);
  const countArray = useSelector((state) => state.count);
  const dispatchFun = useDispatch();

  return (
    <div className="w-full min-h-[100vh] p-[5%] bg-gray-300">
      <div className="p-5 bg-white shadow-lg ">
        {/* <ul>
          {countArray.map((items,index)=>
          <li key={index}>{items}</li>
          )}
        </ul> */}
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="ps-3 py-2">ID</th>
              <th className="ps-3 py-2 flex"> Name</th>
              <th className="ps-3 py-2">Description</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Quatity</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {store.map((items, index) => (
              <tr className="hover:bg-gray-100 border-b" key={index}>
                <td className="ps-3 py-2">{index + 1}</td>
                <td className="ps-3 py-2 truncate max-w-xs flex items-center gap-3">
                  <img src={items.image} alt="" className="h-[50px]" />
                  {items.title.split(" ").slice(0, 4).join(" ")}
                </td>
                <td className="ps-3 py-2 truncate max-w-xs">
                  {items.description.split(" ").slice(0, 6).join(" ")}
                </td>
                {countArray[index] && (
                  <td className="px-3 py-3"> {items.price * countArray[index]}</td>
                )}
                {countArray[index] && (
                  <td className="px-3 py-3">{countArray[index]}</td>
                )}
                <td className="px-3 py-3">
                  <div
                    className="inline-block bg-red-500 p-2 rounded hover:cursor-pointer"
                    onClick={() => dispatchFun(removeItem(index))}
                  >
                    <MdDelete className="text-white w-6 h-6" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CartPage;

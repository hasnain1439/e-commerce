import { createStore } from "redux";

const initialValue = {
  tasks: [],
  count: [], // ✅ array for multiple counts
  price: 0,
};

const AddTask = "tasks/add";
const RemoveTask = "tasks/remove";
const ProductCount = "counter/set";
const PriceCount = "counter/price";

const reducerFunction = (state = initialValue, action) => {
  switch (action.type) {
    case ProductCount:
      return {
        ...state,
        count: [...state.count, action.payload], 
      };

    case PriceCount:
      return {
        ...state,
        price: action.payload,
      };

    case AddTask:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case RemoveTask:
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
        count: state.count.filter((_, index) => index !== action.payload),
 
      };

    default:
      return state;
  }
};

export const store = createStore(reducerFunction);

export const addItem = (task) => ({ type: AddTask, payload: task });
export const removeItem = (index) => ({ type: RemoveTask, payload: index });
export const countValue = (count) => ({
  type: ProductCount,
  payload: count,
});
export const price = (price) => ({ type: PriceCount, payload: price });

import { createStore } from "redux";

const initialValue = {
  tasks: [],
  count: 1,
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
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item
        ),
      };
    case PriceCount:
      return { ...state, price: action.payload }; // ✅ update price only
    case AddTask:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case RemoveTask:
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export const store = createStore(reducerFunction);

export const addItem = (task) => ({ type: AddTask, payload: task });
export const removeItem = (index) => ({ type: RemoveTask, payload: index });
export const countValue = ({id, count}) => ({ type: ProductCount, payload: {id,count} });
export const price = (price) => ({ type: PriceCount, payload: price });

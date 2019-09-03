import { ActionType } from "../Actions/index";
import productApi from "../Api/productApi";
import { stringify } from "query-string";

let data = JSON.parse(localStorage.getItem("CART"));

let initialState = { listCart: data ? data.listCart : [] };

const cart = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case ActionType.ADD_TO_CART: {
      console.log(state);
      const { product, quantity } = action;
      const newList = [...state.listCart];

      let cartIdx = newList.findIndex(x => x.id === product.id);
      console.log(cartIdx);
      if (cartIdx >= 0) {
        newList[cartIdx] = {
          ...newList[cartIdx],
          quantity: newList[cartIdx].quantity + quantity
        };
      } else {
        const cartItem = {
          product,
          id: product.id,
          quantity
        };
        newList.push(cartItem);
      }

      localStorage.setItem(
        "CART",
        JSON.stringify({ ...state, listCart: newList })
      );

      return { ...state, listCart: newList };
    }

    case ActionType.SUBTRACT_TO_CART: {
      const { product, quantity } = action;
      const newList = [...state.listCart];

      let cartIdx = newList.findIndex(x => x.id === product.id);
      newList[cartIdx] = {
        ...newList[cartIdx],
        quantity: newList[cartIdx].quantity - quantity
      };
      if (newList[cartIdx].quantity === 0) {
        newList.splice(cartIdx, 1);
      }

      localStorage.setItem(
        "CART",
        JSON.stringify({ ...state, listCart: newList })
      );
      return { ...state, listCart: newList };
    }

    case ActionType.REMOVE_ITEM: {
      console.log(state);
      const { product } = action;
      const newList = [...state.listCart];

      let cartIdx = newList.findIndex(x => x.id === product.id);
      console.log(cartIdx);
      if (cartIdx >= 0) {
        newList.splice(cartIdx, 1);
      }

      localStorage.setItem(
        "CART",
        JSON.stringify({ ...state, listCart: newList })
      );

      return { ...state, listCart: newList };
    }

    default:
      return state;
  }
};

export default cart;

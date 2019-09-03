import * as types from "../Constants/actionType";

export const ActionType = {
  ADD_TO_CART: types.ADD_TO_CART,
  SUBTRACT_TO_CART: types.SUBTRACT_TO_CART,
  REMOVE_ITEM: types.REMOVE_ITEM
};

export const actionAddToCart = (product, quantity) => {
  return {
    type: ActionType.ADD_TO_CART,
    product,
    quantity
  };
};

export const subtractToCart = (product, quantity) => {
  return {
    type: ActionType.SUBTRACT_TO_CART,
    product,
    quantity
  };
};

export const removeItem = (product, quantity) => {
  return {
    type: ActionType.REMOVE_ITEM,
    product,
    quantity
  };
};

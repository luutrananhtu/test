import { createStore } from "redux";
import { ActionType } from "./Actions";
import cart from "./Reducers/cart";

const store = createStore(cart);

export default store;

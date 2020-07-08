import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./combineReducers";

const initialState = {
   currentUser: {},
   tasks: [],
   editableTask: {},
};

const store = createStore(combineReducers, initialState, composeWithDevTools());

export default store;

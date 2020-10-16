import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "../redux/reducers/userReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  user: userReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

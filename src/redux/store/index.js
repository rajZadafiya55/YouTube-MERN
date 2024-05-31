import { applyMiddleware, createStore } from "redux";
import reducer from "../reducers";
import { thunk } from "redux-thunk";

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer, applyMiddleware(thunk));
const persister = "Free";

export { store, persister };

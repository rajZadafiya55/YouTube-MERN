import { combineReducers } from "redux";

// reducer import
import videoReducer from "./videoReducer";
import likeReducer from "./likeReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import commentReducer from "./commentReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  like: likeReducer,
  videos: videoReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  comments: commentReducer,
});

export default reducer;

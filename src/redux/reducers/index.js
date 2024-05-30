import { combineReducers } from "redux";

// reducer import
import videoReducer from "./videoReducer";
import likeReducer from "./likeReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import commentReducer from "./commentReducer";
import subscriptionRedcucer from "./subscriptionReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  like: likeReducer,
  videos: videoReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  comments: commentReducer,
  subscription: subscriptionRedcucer,
});

export default reducer;

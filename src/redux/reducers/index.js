import { combineReducers } from "redux";

// reducer import
import videoReducer from "./videoReducer";
import likeReducer from "./likeReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import commentReducer from "./commentReducer";
import subscriptionRedcucer from "./subscriptionReducer";
import playlistReducer from "./playlistReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  like: likeReducer,
  videos: videoReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  comments: commentReducer,
  subscription: subscriptionRedcucer,
  playlist: playlistReducer,
});

export default reducer;

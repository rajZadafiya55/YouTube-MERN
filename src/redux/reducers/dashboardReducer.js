import { GET_CHANNEL_ALL_VIDEOS } from "../types";

export const initialState = {
  videosDetails: [], //for store all video data
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_ALL_VIDEOS:
      return {
        ...state,
        videosDetails: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;

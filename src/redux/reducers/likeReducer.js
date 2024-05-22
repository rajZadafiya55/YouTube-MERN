import { GET_LIKED_VIDEOS, TOGGLE_COMMENT_LIKE } from "../types";

export const initialState = {
  videosDetails: [], //for store all video data
  isLiked: false,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKED_VIDEOS:
      return {
        ...state,
        isLiked: action.payload,
      };

    case TOGGLE_COMMENT_LIKE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default likeReducer;

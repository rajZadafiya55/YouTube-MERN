import {
  GET_LIKED_VIDEOS,
  TOGGLE_COMMENT_LIKE,
  TOGGLE_VIDEO_LIKE,
} from "../types";

export const initialState = {
  videosDetails: [], //for store all video data
  isLiked: null,
  isVideoLiked: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKED_VIDEOS:
      return {
        ...state,
        videosDetails: action.payload,
      };

    case TOGGLE_COMMENT_LIKE:
      return {
        ...state,
        isLiked: action.payload,
      };
    case TOGGLE_VIDEO_LIKE:
      return {
        ...state,
        isVideoLiked: action.payload,
      };

    default:
      return state;
  }
};

export default likeReducer;

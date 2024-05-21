/* eslint-disable no-case-declarations */
import {
  ADD_VIDEOS,
  DELETE_VIDEO,
  GET_ALL_VIDEOS,
  GET_VIDEO_BY_ID,
  UPDATE_VIDEO,
} from "../types";

export const initialState = {
  videosDetails: [], //for store all video data
  selectedVideo: null, //for store single seleceted video data
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOS:
      return {
        ...state,
        videosDetails: action.payload,
      };

    case GET_VIDEO_BY_ID:
      return {
        ...state,
        selectedVideo: action.payload,
      };

    case ADD_VIDEOS:
      return {
        ...state,
      };

    case DELETE_VIDEO:
      const updatedVideos = state.videosDetails.filter(
        (video) => video.id !== action.payload
      );
      return {
        ...state,
        videosDetails: updatedVideos,
      };

    case UPDATE_VIDEO:
      return {
        ...state,
        selectedVideo: action.payload,
      };

    default:
      return state;
  }
};

export default videoReducer;
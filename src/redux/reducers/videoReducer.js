/* eslint-disable no-case-declarations */
import {
  ADD_VIDEOS,
  DELETE_VIDEO,
  GET_ALL_VIDEOS,
  GET_VIDEO_BY_ID,
  SEARCH_VIDEO,
  TOGGLE_WATCH_LATER,
  UPDATE_VIDEO,
  VIDEO_VIEWS,
} from "../types";

export const initialState = {
  videosDetails: [], //for store all video data
  selectedVideo: null, //for store single seleceted video data
  isWatchLater: null,
  searchTerm: "",
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

    case TOGGLE_WATCH_LATER:
      return {
        ...state,
        isWatchLater: action.payload,
      };

    case SEARCH_VIDEO:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case VIDEO_VIEWS:
      const updatedVideoDetails = state.videosDetails.map((video) => {
        if (video.id === action.payload) {
          return { ...video, views: video.views + 1 };
        }
        return video;
      });
      return {
        ...state,
        videosDetails: updatedVideoDetails,
      };
    default:
      return state;
  }
};

export default videoReducer;

/* eslint-disable no-case-declarations */
import { ADD_VIDEOS, DELETE_VIDEOS, GET_ALL_VIDEOS } from '../types';

export const initialState = {
  videosDetails: [] //for store all video data
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOS:
      return {
        ...state,
        videosDetails: action.payload
      };

    case ADD_VIDEOS:
      return {
        ...state
      };

    case DELETE_VIDEOS:
      const updatedVideos = state.videosDetails.filter((video) => video.id !== action.payload);
      return {
        ...state,
        videosDetails: updatedVideos
      };

    default:
      return state;
  }
};

export default videoReducer;

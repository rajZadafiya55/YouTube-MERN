import { GET_LIKED_VIDEOS } from '../types';

export const initialState = {
  videosDetails: [] //for store all video data
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKED_VIDEOS:
      return {
        ...state,
        videosDetails: action.payload
      };

    default:
      return state;
  }
};

export default likeReducer;

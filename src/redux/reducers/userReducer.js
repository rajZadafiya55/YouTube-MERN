import {
  CHANGE_PASSWORD,
  GET_USER_CHANNEL_PROFILE,
  NEW_REGISTRATION,
  USER_LOGIN,
} from "../types";

export const initialState = {
  channelDetails: [], //for store all user data
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_REGISTRATION:
      return {
        ...state,
      };

    case USER_LOGIN:
      return {
        ...state,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
      };

    case GET_USER_CHANNEL_PROFILE:
      return {
        ...state,
        channelDetails: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

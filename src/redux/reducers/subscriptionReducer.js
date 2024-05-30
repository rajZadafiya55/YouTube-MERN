import { SUBSCRIBE_TOGGLE } from "../types";

export const initialState = {
  isSubscribed: false,
};

const subscriptionRedcucer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_TOGGLE:
      return {
        ...state,
        isSubscribed: action.payload,
      };

    default:
      return state;
  }
};

export default subscriptionRedcucer;

import {
  CHANNEL_SUBCRIBE_TO_MYCH,
  FETCH_SUBSCRIPTIONS_USER,
  SUBSCRIBE_TOGGLE,
} from "../types";

export const initialState = {
  isSubscribed: false,
  subscriptions: [],
  channelSubscriber: [],
};

const subscriptionRedcucer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_TOGGLE:
      return {
        ...state,
        isSubscribed: action.payload,
      };

    case FETCH_SUBSCRIPTIONS_USER:
      return {
        subscriptions: action.payload,
        isSubscribed: action.payload.length > 0,
      };
    case CHANNEL_SUBCRIBE_TO_MYCH:
      return {
        channelSubscriber: action.payload,
      };
    default:
      return state;
  }
};

export default subscriptionRedcucer;

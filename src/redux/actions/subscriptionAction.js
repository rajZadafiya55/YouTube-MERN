/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  CHANNEL_SUBCRIBE_TO_MYCH,
  FETCH_SUBSCRIPTIONS_USER,
  SUBSCRIBE_TOGGLE,
} from "../types";
import { APIHttp, Header, commonNotify } from "../../constant/Api";
import { getSelectedVideo } from "./videoAction";

const getSubscription = (isSubscribed) => ({
  type: SUBSCRIBE_TOGGLE,
  payload: isSubscribed,
});

export const getSubscriptionToggle = (id, channelId, isSubscribed) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${APIHttp}subscriptions/c/${id}`,
        { isSubscribed },
        Header
      );
      const updatedSubStatus = res.data.data.isSubscribed;
      dispatch(getSubscription(updatedSubStatus));

      if (updatedSubStatus) {
        commonNotify("Channel subscribed successfully!");
      } else {
        commonNotify("Channel unsubscribed successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSubscriptions = (subscriptions) => ({
  type: FETCH_SUBSCRIPTIONS_USER,
  payload: subscriptions,
});

export const fetchSubscriptionsDetails = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${APIHttp}subscriptions/u/${_id}`,
        Header
      );
      const result = response.data;
      if (result.success && result.data.length > 0) {
        dispatch(fetchSubscriptions(result.data[0].channelDetails));
      } else {
        dispatch(fetchSubscriptions([]));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchChannel = (subscriptions) => ({
  type: CHANNEL_SUBCRIBE_TO_MYCH,
  payload: subscriptions,
});

export const fetchChannelToSubScribeMe = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${APIHttp}subscriptions/c/${id}`,
        Header
      );
      const result = response.data;
      if (result.success && result.data.length > 0) {
        dispatch(fetchChannel(result.data[0].subscriberDetails));
      } else {
        dispatch(fetchChannel([]));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

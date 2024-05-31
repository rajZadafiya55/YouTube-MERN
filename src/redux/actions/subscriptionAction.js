/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { SUBSCRIBE_TOGGLE } from "../types";
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
      await dispatch(getSubscription(updatedSubStatus));

      dispatch(getSelectedVideo(channelId));

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

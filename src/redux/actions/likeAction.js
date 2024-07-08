/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  GET_LIKED_VIDEOS,
  TOGGLE_COMMENT_LIKE,
  TOGGLE_VIDEO_LIKE,
} from "../types";
import { APIHttp, Header, showToast, commonNotify } from "../../constant/Api";
import { getSelectedComment } from "./commentAction";
import { getSelectedVideo } from "./videoAction";

const getLikeVideo = (video) => ({
  type: GET_LIKED_VIDEOS,
  payload: video,
});

export const getAllLikedVideos = () => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}likes/videos`, Header)
      .then((res) => {
        dispatch(getLikeVideo(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getLikeComment = (isLiked) => ({
  type: TOGGLE_COMMENT_LIKE,
  payload: isLiked,
});

export const getLikeCommentToggle = (commentId, isLiked, _id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${APIHttp}likes/toggle/c/${commentId}`,
        { isLiked },
        Header
      );
      const updatedLikeStatus = res.data.data.isLiked;

      await dispatch(getLikeComment(updatedLikeStatus));
      dispatch(getSelectedComment(_id));

      if (updatedLikeStatus) {
        showToast("Comment liked successfully!");
      } else {
        showToast("Comment disliked successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getLikevideo = (isVideoLiked) => ({
  type: TOGGLE_VIDEO_LIKE,
  payload: isVideoLiked,
});

export const getLikeVideoToggle = (id, isLiked) => {
  return (dispatch) => {
    axios
      .post(`${APIHttp}likes/toggle/v/${id}`, { isLiked }, Header)
      .then(async (res) => {
        const updatedLikeStatus = res.data.data.isLiked;
        await dispatch(getLikevideo(updatedLikeStatus));
        dispatch(getSelectedVideo(id));

        if (updatedLikeStatus == true) {
          commonNotify("Video liked successfully!");
        } else {
          commonNotify("Video dislike successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

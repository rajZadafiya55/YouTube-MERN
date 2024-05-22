/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GET_LIKED_VIDEOS, TOGGLE_COMMENT_LIKE } from "../types";
import { APIHttp, Header, showToast } from "../../constant/Api";
import { getSelectedComment } from "./commentAction";

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

export const getLikeCommentToggle = (id, isLiked) => {
  return (dispatch) => {
    axios
      .post(`${APIHttp}likes/toggle/c/${id}`, { isLiked }, Header)
      .then(async (res) => {
        const updatedLikeStatus = res.data.data.isLiked;
        await dispatch(getLikeComment(updatedLikeStatus));
        await dispatch(getSelectedComment());

        if (updatedLikeStatus == true) {
          showToast("Comment liked successfully!");
        } else {
          showToast("Comment dislike successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

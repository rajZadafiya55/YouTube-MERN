import axios from "axios";
import { GET_CHANNEL_ALL_VIDEOS, GET_CHANNEL_VIDEOS_BY_ID } from "../types";
import { APIHttp, Header } from "../../constant/Api";

const getAllVideo = (video) => ({
  type: GET_CHANNEL_ALL_VIDEOS,
  payload: video,
});

export const getAllChannelVideos = () => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}dashboard/videos`, Header)
      .then((res) => {
        dispatch(getAllVideo(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getvideoAction = (video) => ({
  type: GET_CHANNEL_VIDEOS_BY_ID,
  payload: video,
});

export const getAllChannelVideosById = (id) => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}dashboard/videos/${id}`, Header)
      .then(async (res) => {
        await dispatch(getvideoAction(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

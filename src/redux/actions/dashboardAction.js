import axios from 'axios';
import { GET_CHANNEL_ALL_VIDEOS } from '../types';

import { APIHttp, Header } from 'constant/Api';

const getAllVideo = (video) => ({
  type: GET_CHANNEL_ALL_VIDEOS,
  payload: video
});

export const getAllChannelVideos = () => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}dashboard/videos`, Header)
      .then((res) => {
        dispatch(getAllVideo(res.data.data));
        console.log('channel all videos', res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

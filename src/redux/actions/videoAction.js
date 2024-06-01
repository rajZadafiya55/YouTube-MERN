import axios from "axios";
import {
  ADD_VIDEOS,
  DELETE_VIDEO,
  GET_ALL_VIDEOS,
  GET_VIDEO_BY_ID,
  SEARCH_VIDEO,
  TOGGLE_WATCH_LATER,
  UPDATE_VIDEO,
  VIDEO_VIEWS,
} from "../types";
import {
  APIHttp,
  Header,
  VideoHeader,
  commonNotify,
  showErrorToast,
  showToast,
} from "../../constant/Api";
import { getAllChannelVideos } from "./dashboardAction";
import { getUserWatchHistory } from "./userAction";

// Action creators
const addVideo = () => ({ type: ADD_VIDEOS });

const deleteVideo = (videoId) => ({
  type: DELETE_VIDEO,
  payload: videoId,
});

const getVideos = (videos) => ({
  type: GET_ALL_VIDEOS,
  payload: videos,
});

const getVideoById = (videos) => ({
  type: GET_VIDEO_BY_ID,
  payload: videos,
});

const updateVideo = () => ({
  type: UPDATE_VIDEO,
});

const getWatchlater = (isWatchLater) => ({
  type: TOGGLE_WATCH_LATER,
  payload: isWatchLater,
});

// Thunks
export const getAllVideos = () => (dispatch) => {
  axios
    .get(`${APIHttp}videos`)
    .then((res) => {
      dispatch(getVideos(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSelectedVideo = (id) => (dispatch) => {
  axios
    .get(`${APIHttp}videos/${id}`, Header)
    .then((res) => {
      dispatch(getVideoById(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addVideoData = (formData, setLoading, setIsClicked) => {
  return (dispatch) => {
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("isPublished", formData.isPublished || false);

    formDataToSend.append("videoFile", formData.videoFile);
    formDataToSend.append("thumbnail", formData.thumbnail);

    axios
      .post(`${APIHttp}videos`, formDataToSend, VideoHeader)
      .then(async (res) => {
        if (res.data.success === true) {
          showToast("Video added successfully!");
          setLoading(false);
          setIsClicked(false);
          await dispatch(addVideo());
          dispatch(getAllChannelVideos());
        } else {
          showErrorToast("Failed to upload video");
          setLoading(true);
          setIsClicked(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteVideoDetails = (videoId) => (dispatch) => {
  axios
    .delete(`${APIHttp}videos/${videoId}`, Header)
    .then(async (res) => {
      await dispatch(deleteVideo(videoId));
      dispatch(getAllChannelVideos());
      if (res.data.success) {
        showToast("Video Deleted successfully!");
      }
    })
    .catch((err) => {
      console.log(err);
      showErrorToast("Failed to delete video");
    });
};

export const updateVideoData = (videoId, formData, navigate) => {
  return (dispatch) => {
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("isPublished", formData.isPublished || false);
    formDataToSend.append("thumbnail", formData.thumbnail);

    axios
      .patch(`${APIHttp}videos/${videoId}`, formData, VideoHeader)
      .then(async (res) => {
        if (res.data.success) {
          await dispatch(updateVideo(res.data.data));
          dispatch(getAllChannelVideos());
          navigate("/studio/video");
          showToast("Video updated successfully!");
        } else {
          showErrorToast("Failed to update video");
        }
      })
      .catch((err) => {
        console.log(err);
        showErrorToast("Failed to update video");
      });
  };
};

export const toggleWatchLater = (id, isWatchLater) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        `${APIHttp}videos/toggle/watchlater/${id}`,
        { isWatchLater },
        Header
      );
      const updatedWLStatus = res.data.data.videoStatus;
      await dispatch(getWatchlater(updatedWLStatus));
      dispatch(getUserWatchHistory());

      if (updatedWLStatus) {
        commonNotify("Video saved to Watch Later.!");
      } else {
        commonNotify("Video unsaved to Watch Later.!");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setSearch = (searchTerm) => ({
  type: SEARCH_VIDEO,
  payload: searchTerm,
});

export const updateVideoViews = (id) => async (dispatch) => {
  try {
    await axios.patch(`${APIHttp}videos/views/${id}`);
    dispatch({
      type: VIDEO_VIEWS,
      payload: id,
    });
  } catch (error) {
    console.error("view error", error.message);
  }
};

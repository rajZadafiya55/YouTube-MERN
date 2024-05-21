import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_VIDEOS,
  DELETE_VIDEO,
  GET_ALL_VIDEOS,
  GET_VIDEO_BY_ID,
  UPDATE_VIDEO,
} from "../types";
import { APIHttp, Header, VideoHeader } from "../../constant/Api";

// Toast messages
const showToast = (message) => {
  toast.success(message, { position: "top-right" });
};

const showErrorToast = (message) => {
  toast.error(message, { position: "top-right" });
};

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

// Thunks
export const getAllVideos = () => (dispatch) => {
  axios
    .get(`${APIHttp}videos`, Header)
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
      console.log("selected res data ", res.data.data);
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
      .then((res) => {
        if (res.data.success === true) {
          showToast("Video added successfully!");
          setLoading(false);
          setIsClicked(false);
          dispatch(addVideo());
          dispatch(getAllVideos());
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
    .then((res) => {
      dispatch(deleteVideo(videoId));
      // dispatch(getAllVideos());
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
        console.log("res updates data ", res.data.data);
        if (res.data.success) {
          await dispatch(updateVideo(res.data.data));
          await dispatch(getAllVideos());
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

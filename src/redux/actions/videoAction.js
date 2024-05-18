import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ADD_VIDEOS, DELETE_VIDEOS, GET_ALL_VIDEOS } from "../types";
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
  type: DELETE_VIDEOS,
  payload: videoId,
});

const getVideos = (videos) => ({
  type: GET_ALL_VIDEOS,
  payload: videos,
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

export const addVideoData = (data) => {
  return (dispatch) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("isPublished", data.isPublished);

    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail);

    axios
      .post(`${APIHttp}videos`, formData, VideoHeader)
      .then((res) => {
        dispatch(addVideo());
        if (res.data.success === true) {
          showToast("Video added successfully!");
        } else {
          showErrorToast("Failed to upload video");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const addVideoData = (data) => {
//   console.log("data", data);
//   console.log("video file data is", data.videoFile);
//   console.log("thumbnail", data.thumbnail);
//   const formData = new FormData();

//   formData.append("videoFile", data.videoFile);
//   formData.append("thumbnail", data.thumbnail);
//   formData.append("title", data.title);
//   formData.append("description", data.description);
//   formData.append("isPublished", data.isPublished);

//   formData.append("name", "Raj Zadafiya");

//   console.log("append data ", formData);

//   // Log each item in FormData
//   for (let [key, value] of formData.entries()) {
//     if (key === "videoFile" || key === "thumbnail") {
//       console.log(`${key}:`, value.name); // Log the file names
//       // formData.append(key, data.thumbnail);
//     } else {
//       console.log(`${key}:`, value);
//     }
//   }

//   // for (let [key, value] of formData.entries()) {
//   //   console.log(key, value, "======");
//   //   // formData.append(key, value);
//   //   // formData.append("name", "Raj Zadafiya");
//   // }

//   const accessToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExNDAwNTU2NTMwODlhOTg4ZGNhNjQiLCJlbWFpbCI6InJhakBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhaiIsImZ1bGxOYW1lIjoiUmFqIFphZGFmaXlhIiwiaWF0IjoxNzE2MDQxNTkzLCJleHAiOjE3MTYxMjc5OTN9.31qE9HXkWW3l2SLegccLgK4gOeWXMHPJ1l5fEe1Tkyo";
//   return (dispatch) => {
//     axios
//       .post(`${APIHttp}videos`, formData, {
//         // headers: { "Content-Type": "multipart/form-data" },
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + accessToken,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         dispatch(addVideo());
//         if (res.data.success === true) {
//           showToast("Video added successfully!");
//         } else {
//           showErrorToast("Failed to upload video");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const deleteVideoDetails = (videoId) => (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${APIHttp}videos/${videoId}`, Header)
        .then(() => {
          dispatch(deleteVideo(videoId));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          showErrorToast("Failed to delete video");
        });
    }
  });
};

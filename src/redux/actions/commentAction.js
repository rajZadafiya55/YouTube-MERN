import axios from "axios";
import { DELETE_COMMENT, GET_COMMENT_BY_ID } from "../types";
import { APIHttp, Header, showErrorToast, showToast } from "../../constant/Api";
import Swal from "sweetalert2";

const getCommentById = (videos) => ({
  type: GET_COMMENT_BY_ID,
  payload: videos,
});

export const getSelectedComment = (id) => (dispatch) => {
  axios
    .get(`${APIHttp}comments/${id}`, Header)
    .then((res) => {
      dispatch(getCommentById(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

// export const deleteCoomentsDetails = (commentId) => (dispatch) => {
//   axios
//     .delete(`${APIHttp}comments/c/${commentId}`, Header)
//     .then(async (res) => {
//       await dispatch(deleteComment(commentId));
//       await dispatch(getSelectedComment());
//       if (res.data.success) {
//         showToast("Video Deleted successfully!");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       showErrorToast("Failed to delete comment");
//     });
// };

export const deleteCoomentsDetails = (commentId) => async (dispatch) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure Delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      axios
        .delete(`${APIHttp}comments/c/${commentId}`, Header)
        .then(async (res) => {
          await dispatch(deleteComment(commentId));
          await dispatch(getSelectedComment());
          if (res.data.success) {
            showToast("Video Deleted successfully!");
          }
        })
        .catch((err) => {
          console.log(err);
          showErrorToast("Failed to delete comment");
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};

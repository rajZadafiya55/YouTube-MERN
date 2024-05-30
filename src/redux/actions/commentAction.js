import axios from "axios";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_BY_ID,
  GET_USER_ALL_COMMENT,
} from "../types";
import { APIHttp, Header, showErrorToast, showToast } from "../../constant/Api";
import Swal from "sweetalert2";

const getAllComment = (comment) => ({
  type: GET_USER_ALL_COMMENT,
  payload: comment,
});

export const getUserAllComments = () => (dispatch) => {
  axios
    .get(`${APIHttp}comments`, Header)
    .then(async (res) => {
      console.log("res data data ", res.data.data);
      dispatch(getAllComment(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCommentById = (comment) => ({
  type: GET_COMMENT_BY_ID,
  payload: comment,
});

export const getSelectedComment = (id) => (dispatch) => {
  axios
    .get(`${APIHttp}comments/${id}`, Header)
    .then(async (res) => {
      await dispatch(getCommentById(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const deleteCommentsDetails = (commentId) => async (dispatch) => {
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
          dispatch(getUserAllComments());
          if (res.data.success) {
            showToast("Comment Deleted successfully!");
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

const addComment = () => ({
  type: CREATE_COMMENT,
});

export const createComment = (id, commentData) => (dispatch) => {
  axios
    .post(`${APIHttp}comments/${id}`, commentData, Header)
    .then(async (res) => {
      await dispatch(addComment(res.data.data));
      dispatch(getSelectedComment());

      console.log("res data data", res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

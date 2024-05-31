/* eslint-disable no-case-declarations */
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_BY_ID,
  GET_USER_ALL_COMMENT,
} from "../types";

export const initialState = {
  commentsDetails: [], //for store all comment data
  selectedComment: null, //for store single seleceted comment data
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ALL_COMMENT:
      return {
        ...state,
        commentsDetails: action.payload,
      };
    case GET_COMMENT_BY_ID:
      return {
        ...state,
        selectedComment: action.payload,
      };
    case DELETE_COMMENT:
      // return {
      //   ...state,
      // };
      const updatedComments = state.selectedComment?.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...state,
        selectedComment: updatedComments,
      };

    case CREATE_COMMENT:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default commentReducer;

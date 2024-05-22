/* eslint-disable no-case-declarations */
import { DELETE_COMMENT, GET_COMMENT_BY_ID } from "../types";

export const initialState = {
  commentsDetails: [], //for store all comment data
  selectedComment: null, //for store single seleceted comment data
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_BY_ID:
      return {
        ...state,
        selectedComment: action.payload,
      };
    case DELETE_COMMENT:
      const updatedComments = state.selectedComment.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...state,
        selectedComment: updatedComments,
      };

    default:
      return state;
  }
};

export default commentReducer;

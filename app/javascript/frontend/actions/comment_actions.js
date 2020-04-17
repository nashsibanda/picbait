export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const CLEAR_COMMENT = "CLEAR_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
import * as CommentsAPIUtil from "../util/comments_api_util";
import { postingComments, postedComments } from "./posting_actions";

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment,
});

const clearComment = comment => ({
  type: CLEAR_COMMENT,
  comment,
});

const receiveCommentErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors,
});

export const createComment = formComment => dispatch => {
  dispatch(postingComments());
  CommentsAPIUtil.postComment(formComment).then(
    comment => {
      dispatch(receiveComment(comment));
      dispatch(postedComments());
    },
    errors => {
      dispatch(receiveCommentErrors(errors));
      dispatch(postedComments());
    }
  );
};

export const removeComment = id => dispatch => {
  dispatch(postingComments());
  CommentsAPIUtil.deleteComment(id).then(
    comment => {
      dispatch(clearComment(comment));
      dispatch(postedComments());
    },
    errors => {
      dispatch(receiveCommentErrors(errors));
      dispatch(postedComments());
    }
  );
};

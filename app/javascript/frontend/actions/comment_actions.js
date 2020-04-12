export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const CLEAR_COMMENT = "CLEAR_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
import * as CommentsAPIUtil from "../util/comments_api_util";

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
  CommentsAPIUtil.postComment(formComment).then(
    comment => {
      dispatch(receiveComment(comment));
    },
    errors => dispatch(receiveCommentErrors(errors))
  );
};

export const removeComment = id => dispatch => {
  CommentsAPIUtil.deleteComment(id).then(
    comment => {
      dispatch(clearComment(comment));
    },
    errors => dispatch(receiveCommentErrors(errors))
  );
};

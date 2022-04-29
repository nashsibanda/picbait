export const RECEIVE_POST_LIKE = "RECEIVE_POST_LIKE";
export const CLEAR_POST_LIKE = "CLEAR_POST_LIKE";
export const RECEIVE_COMMENT_LIKE = "RECEIVE_COMMENT_LIKE";
export const CLEAR_COMMENT_LIKE = "CLEAR_COMMENT_LIKE";
import * as LikesAPIUtil from "./../util/likes_api_util";

const receivePostLike = like => ({
  type: RECEIVE_POST_LIKE,
  like,
});

const clearPostLike = like => ({
  type: CLEAR_POST_LIKE,
  like,
});

const receiveCommentLike = like => ({
  type: RECEIVE_COMMENT_LIKE,
  like,
});

const clearCommentLike = like => ({
  type: CLEAR_COMMENT_LIKE,
  like,
});

export const createPostLike = postId => dispatch => {
  LikesAPIUtil.postPostLike(postId).then(like =>
    dispatch(receivePostLike(like.data))
  );
};

export const deletePostLike = id => dispatch => {
  LikesAPIUtil.deleteLike(id).then(like => dispatch(clearPostLike(like.data)));
};

export const createCommentLike = commentId => dispatch => {
  LikesAPIUtil.postCommentLike(commentId).then(like =>
    dispatch(receiveCommentLike(like.data))
  );
};

export const deleteCommentLike = id => dispatch => {
  LikesAPIUtil.deleteLike(id).then(like =>
    dispatch(clearCommentLike(like.data))
  );
};

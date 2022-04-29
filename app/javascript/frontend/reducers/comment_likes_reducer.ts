import { RECEIVE_COMMENTS, RECEIVE_COMMENT } from "../actions/comment_actions";
import {
  RECEIVE_COMMENT_LIKE,
  CLEAR_COMMENT_LIKE,
} from "../actions/like_actions";

const commentLikesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const likesOutput = {};
      action.comments.forEach(comment => {
        const commentLikes = {};
        comment.likes.forEach(like => {
          commentLikes[like.api_user_id] = like;
        });
        likesOutput[comment.id] = commentLikes;
      });
      return likesOutput;
    case RECEIVE_COMMENT:
      const { comment } = action;
      const thisCommentLikes = {};
      comment.likes.forEach(like => {
        thisCommentLikes[like.api_user_id] = like;
      });
      return Object.assign({}, state, { [comment.id]: thisCommentLikes });
    case RECEIVE_COMMENT_LIKE:
      const stateCommentLikes = Object.assign({}, state);
      const { like } = action;
      const likedComment = stateCommentLikes[like.likeable_id];
      likedComment[like.api_user_id] = like;
      stateCommentLikes[like.likeable_id] = likedComment;
      return stateCommentLikes;
    case CLEAR_COMMENT_LIKE:
      const oldLike = action.like;
      const oldCommentLikes = Object.assign({}, state);
      const commentToClear = oldCommentLikes[oldLike.likeable_id];
      delete commentToClear[oldLike.api_user_id];
      oldCommentLikes[oldLike] = commentToClear;
      return oldCommentLikes;
    default:
      return state;
  }
};

export default commentLikesReducer;

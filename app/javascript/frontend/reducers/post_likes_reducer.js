import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_MORE_POSTS,
  CLEAR_POSTS,
} from "../actions/post_actions";
import { RECEIVE_POST_LIKE, CLEAR_POST_LIKE } from "../actions/like_actions";

const postLikesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      const likesOutput = {};
      action.posts.forEach(post => {
        const postLikes = {};
        post.likes.forEach(like => {
          postLikes[like.api_user_id] = like;
        });
        likesOutput[post.id] = postLikes;
      });
      return likesOutput;
    case RECEIVE_MORE_POSTS:
      const currentLikes = Object.assign({}, state);
      action.posts.forEach(post => {
        const newPostLikes = {};
        post.likes.forEach(like => {
          newPostLikes[like.api_user_id] = like;
        });
        currentLikes[post.id] = newPostLikes;
      });
      return currentLikes;
    case RECEIVE_POST:
      const { post } = action;
      const thisPostLikes = {};
      post.likes.forEach(like => {
        thisPostLikes[like.api_user_id] = like;
      });
      return Object.assign({}, state, { [post.id]: thisPostLikes });
    case RECEIVE_POST_LIKE:
      const statePostLikes = Object.assign({}, state);
      const { like } = action;
      const likedPost = statePostLikes[like.likeable_id];
      likedPost[like.api_user_id] = like;
      statePostLikes[like.likeable_id] = likedPost;
      return statePostLikes;
    case CLEAR_POST_LIKE:
      const oldLike = action.like;
      const oldPostLikes = Object.assign({}, state);
      const postToClear = oldPostLikes[oldLike.likeable_id];
      delete postToClear[oldLike.api_user_id];
      oldPostLikes[oldLike] = postToClear;
      return oldPostLikes;
    case CLEAR_POSTS:
      return {};
    default:
      return state;
  }
};

export default postLikesReducer;

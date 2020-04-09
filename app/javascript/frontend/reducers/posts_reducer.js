import {
  RECEIVE_POST,
  RECEIVE_POSTS,
  CLEAR_POSTS,
  CLEAR_POST,
} from "../actions/post_actions";

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      const postsOutput = {};
      action.posts.forEach(post => {
        postsOutput[post.id] = post;
      });
      return postsOutput;
    case RECEIVE_POST:
      const { post } = action;
      return Object.assign({}, state, { [post.id]: post });
    case CLEAR_POSTS:
      return {};
    case CLEAR_POST:
      const shortenedPostsOutput = Object.assign({}, state);
      delete shortenedPostsOutput[action.post.id];
      return shortenedPostsOutput;
    default:
      return state;
  }
};

export default postsReducer;

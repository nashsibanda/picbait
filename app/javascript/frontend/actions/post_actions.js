export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_POSTS = "CLEAR_POSTS";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";
import * as PostsAPI from "./../util/posts_api_util.js";
import { push } from "connected-react-router";

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
});

const clearPost = id => ({
  type: CLEAR_POST,
  id,
});

const receivePostErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors,
});

export const fetchPosts = userId => dispatch => {
  PostsAPI.getPosts(userId).then(posts => dispatch(receivePosts(posts)));
};

export const fetchPost = id => dispatch => {
  PostsAPI.getPost(id).then(post => dispatch(receivePost(post)));
};

export const createPost = (formPost, userSlug) => dispatch => {
  PostsAPI.postPost(formPost).then(
    post => {
      dispatch(receivePost(post));
      dispatch(push(`/users/${userSlug}`));
    },
    errors => dispatch(receivePostErrors(errors.responseJSON))
  );
};

export const deletePost = (id, userSlug) => dispatch => {
  PostsAPI.deletePost(id).then(
    post => {
      dispatch(clearPost(post));
      dispatch(push(`/users/${userSlug}`));
    },
    errors => dispatch(receivePostErrors(errors.responseJSON))
  );
};

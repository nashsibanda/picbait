export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_POSTS = "CLEAR_POSTS";
import * as PostsAPI from "./../util/posts_api_util.js";

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

export const fetchPosts = userId => dispatch => {
  PostsAPI.getPosts(userId).then(posts => dispatch(receivePosts(posts)));
};

export const fetchPost = id => dispatch => {
  PostsAPI.getPost(id).then(post => dispatch(receivePost(post)));
};

export const createPost = formPost => dispatch => {
  PostsAPI.postPost(formPost).then(post => dispatch(receivePost(post)));
};

export const deletePost = id => dispatch => {
  PostsAPI.deletePost(id).then(post => dispatch(clearPost(post)));
};

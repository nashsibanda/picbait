export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_POSTS = "CLEAR_POSTS";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";
import * as PostsAPIUtil from "./../util/posts_api_util.js";
import * as CommentsAPIUtil from "../util/comments_api_util";
import * as UsersAPIUtil from "../util/users_api_util";
import { push } from "connected-react-router";
import { receiveComments } from "./comment_actions.js";
import { fetchUsers } from "./user_actions.js";

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

const clearPost = post => ({
  type: CLEAR_POST,
  post,
});

const receivePostErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors,
});

export const fetchPosts = userId => dispatch => {
  PostsAPIUtil.getPosts(userId).then(posts => dispatch(receivePosts(posts)));
};

export const fetchPost = id => dispatch => {
  PostsAPIUtil.getPost(id).then(post => dispatch(receivePost(post)));
  CommentsAPIUtil.getComments(id).then(comments =>
    dispatch(receiveComments(comments))
  );
  dispatch(fetchUsers({ post_id: id }));
};

export const createPost = (formPost, userSlug) => dispatch => {
  PostsAPIUtil.postPost(formPost).then(
    post => {
      dispatch(receivePost(post));
      dispatch(push(`/users/${userSlug}`));
    },
    errors => dispatch(receivePostErrors(errors.responseJSON))
  );
};

export const deletePost = (id, userSlug) => dispatch => {
  PostsAPIUtil.deletePost(id).then(
    post => {
      dispatch(clearPost(post));
      dispatch(push(`/users/${userSlug}`));
    },
    errors => dispatch(receivePostErrors(errors.responseJSON))
  );
};

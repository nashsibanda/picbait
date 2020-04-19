export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_MORE_POSTS = "RECEIVE_MORE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_POSTS = "CLEAR_POSTS";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";
import * as PostsAPIUtil from "./../util/posts_api_util.js";
import * as CommentsAPIUtil from "../util/comments_api_util";
import { push } from "connected-react-router";
import { receiveComments } from "./comment_actions.js";
import { fetchUsers } from "./user_actions.js";
import {
  loadingPosts,
  loadedPosts,
  loadingComments,
  loadingPostPage,
  loadedPostPage,
  loadedComments,
} from "./fetching_actions.js";
import { postingPosts, postedPosts } from "./posting_actions.js";
import { fetchUsersAutocomplete } from "./autocomplete_actions.js";

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

const receiveMorePosts = posts => ({
  type: RECEIVE_MORE_POSTS,
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

export const fetchUserPosts = (userId, page) => dispatch => {
  dispatch(loadingPostPage());
  PostsAPIUtil.getUserPosts(userId, page).then(posts => {
    dispatch(receiveMorePosts(posts));
    dispatch(loadedPostPage());
  });
};

export const fetchFeedPosts = page => dispatch => {
  dispatch(loadingPostPage());

  PostsAPIUtil.getFeedPosts(page).then(posts => {
    dispatch(receivePosts(posts));
    dispatch(loadedPostPage());
  });
};

export const fetchMoreFeedPosts = page => dispatch => {
  dispatch(loadingPostPage());
  PostsAPIUtil.getFeedPosts(page).then(posts => {
    dispatch(receiveMorePosts(posts));
    dispatch(loadedPostPage());
  });
};

export const fetchPost = id => dispatch => {
  dispatch(loadingPosts());
  dispatch(loadingComments());
  PostsAPIUtil.getPost(id).then(post => {
    dispatch(receivePost(post));
    dispatch(loadedPosts());
  });
  CommentsAPIUtil.getComments(id).then(comments => {
    dispatch(receiveComments(comments));
    dispatch(loadedComments());
  });
  dispatch(fetchUsersAutocomplete());
  dispatch(fetchUsers({ post_id: id }));
};

export const createPost = (formPost, userSlug) => dispatch => {
  dispatch(postingPosts());
  PostsAPIUtil.postPost(formPost).then(
    post => {
      dispatch(receivePost(post));
      dispatch(postedPosts());
      dispatch(push(`/users/${userSlug}`));
    },
    errors => {
      dispatch(receivePostErrors(errors.responseJSON));
      dispatch(postedPosts());
    }
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

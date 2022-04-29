import axios from "axios";
import { setToken } from "./misc_util";

setToken(axios);

export const getFeedPosts = page =>
  axios({
    method: "get",
    url: `api/posts`,
    data: { page },
  });

export const getUserPosts = (userId, page) =>
  axios({
    method: "get",
    url: `api/users/${userId}/posts`,
    data: { page },
  });

export const getPost = id =>
  axios({
    method: "get",
    url: `api/posts/${id}`,
  });

export const postPost = post =>
  axios({
    method: "post",
    url: "api/posts",
    data: post,
    headers: {
      "Content-Type": false,
      "processData": false,
    },
  });

export const patchPost = (id, post) =>
  axios({
    method: "patch",
    url: `api/posts/${id}`,
    data: post,
  });

export const deletePost = id =>
  axios({
    method: "delete",
    url: `api/posts/${id}`,
  });

import axios from "axios";
import { setToken } from "./misc_util";

setToken(axios);

export const getComments = postId =>
  axios({
    method: "get",
    url: `api/posts/${postId}/comments`,
  });

export const getComment = id =>
  axios({
    method: "get",
    url: `api/comments/${id}`,
  });

export const postComment = comment =>
  axios({
    method: "post",
    url: "api/comments",
    data: comment,
    headers: {
      "Content-Type": false,
      processData: false,
    },
  });

export const patchComment = (id, comment) =>
  axios({
    method: "patch",
    url: `api/comments/${id}`,
    data: comment,
  });

export const deleteComment = id =>
  axios({
    method: "delete",
    url: `api/comments/${id}`,
  });

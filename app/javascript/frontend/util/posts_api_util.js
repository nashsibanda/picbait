import { token } from "./misc_util";

export const getPosts = userId =>
  $.ajax({
    type: "get",
    url: `api/users/${userId}/posts`,
  });

export const getPost = id =>
  $.ajax({
    type: "get",
    url: `api/posts/${id}`,
  });

export const postPost = post =>
  $.ajax({
    type: "post",
    url: "api/posts",
    data: post,
    beforeSend: token,
    contentType: false,
    processData: false,
    error: response => {
      console.log(response);
    },
  });

export const patchPost = (id, post) =>
  $.ajax({
    type: "post",
    url: `api/posts/${id}`,
    data: post,
    beforeSend: token,
    error: response => {
      console.log(response);
    },
  });

export const deletePost = id =>
  $.ajax({
    type: "delete",
    url: `api/posts/${id}`,
    beforeSend: token,
  });

import { token } from "./misc_util";

export const getFeedPosts = page =>
  $.ajax({
    type: "get",
    url: `api/posts`,
    data: { page },
  });

export const getUserPosts = (userId, page) =>
  $.ajax({
    type: "get",
    url: `api/users/${userId}/posts`,
    data: { page },
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
  });

export const patchPost = (id, post) =>
  $.ajax({
    type: "patch",
    url: `api/posts/${id}`,
    data: post,
    beforeSend: token,
  });

export const deletePost = id =>
  $.ajax({
    type: "delete",
    url: `api/posts/${id}`,
    beforeSend: token,
  });

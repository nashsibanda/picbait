import { token } from "./misc_util";

export const getComments = postId =>
  $.ajax({
    type: "get",
    url: `api/posts/${postId}/comments`,
  });

export const getComment = id =>
  $.ajax({
    type: "get",
    url: `api/comments/${id}`,
  });

export const postComment = comment =>
  $.ajax({
    type: "post",
    url: "api/comments",
    data: { comment },
    beforeSend: token,
  });

export const patchComment = (id, comment) =>
  $.ajax({
    type: "patch",
    url: `api/comments/${id}`,
    data: comment,
    beforeSend: token,
  });

export const deleteComment = id =>
  $.ajax({
    type: "delete",
    url: `api/comments/${id}`,
    beforeSend: token,
  });

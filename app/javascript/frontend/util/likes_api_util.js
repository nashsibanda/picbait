import { token } from "./misc_util";

export const postPostLike = postId =>
  $.ajax({
    type: "post",
    url: `api/posts/${postId}/likes`,
    beforeSend: token,
  });

export const postCommentLike = commentId =>
  $.ajax({
    type: "post",
    url: `api/comments/${commentId}/likes`,
    beforeSend: token,
  });

export const deleteLike = id =>
  $.ajax({
    type: "delete",
    url: `api/likes/${id}`,
    beforeSend: token,
  });

import axios from "axios";
import { setToken } from "./misc_util";

setToken(axios);

export const postPostLike = postId =>
  axios({
    method: "post",
    url: `api/posts/${postId}/likes`,
  });

export const postCommentLike = commentId =>
  axios({
    method: "post",
    url: `api/comments/${commentId}/likes`,
  });

export const deleteLike = id =>
  axios({
    method: "delete",
    url: `api/likes/${id}`,
  });

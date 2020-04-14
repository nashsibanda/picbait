import { token } from "./misc_util";

export const getFollows = (userId, data) =>
  $.ajax({
    type: "get",
    url: `api/users/${userId}/follows`,
    data,
  });

export const postFollow = userId =>
  $.ajax({
    type: "post",
    url: `api/users/${userId}/follow`,
    beforeSend: token,
  });

export const deleteFollow = userId =>
  $.ajax({
    type: "delete",
    url: `api/users/${userId}/follow`,
    beforeSend: token,
  });

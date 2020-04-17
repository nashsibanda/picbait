import { token } from "./misc_util";

export const getUsers = data =>
  $.ajax({
    type: "get",
    url: "api/users",
    data,
  });

export const getUser = userId =>
  $.ajax({
    type: "get",
    url: `api/users/${userId}`,
  });

export const patchUser = (id, user) => {
  return $.ajax({
    type: "patch",
    url: `api/users/${id}`,
    data: user,
    beforeSend: token,
    contentType: false,
    processData: false,
  });
};

import { token } from "./misc_util";

export const getUsers = data =>
  $.ajax({
    type: "get",
    url: "api/users",
    data,
    error: err => console.log(err),
  });

export const getUser = userId =>
  $.ajax({
    type: "get",
    url: `api/users/${userId}`,
  });

export const patchUser = (id, user) => {
  console.log(user);
  return $.ajax({
    type: "patch",
    url: `api/users/${id}`,
    data: user,
    beforeSend: token,
    contentType: false,
    processData: false,
    error: response => {
      console.log(response);
    },
  });
};

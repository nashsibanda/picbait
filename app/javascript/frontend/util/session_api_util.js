import { token } from "./csrf_util";

export const signup = user =>
  $.ajax({
    type: "post",
    url: "api/users",
    data: { user },
    beforeSend: token,
    error: response => {
      console.log(response);
    },
  });

export const login = user =>
  $.ajax({
    type: "post",
    url: "api/session",
    data: { user },
    beforeSend: token,
  });

export const logout = () =>
  $.ajax({
    type: "delete",
    url: "api/session",
    beforeSend: token,
  });

import axios from "axios";
import { setToken } from "./misc_util";

setToken(axios);

export const getUsers = data =>
  axios({
    method: "get",
    url: "api/users",
    data,
  });

export const getUsersAutocomplete = () =>
  axios({
    method: "get",
    url: "api/users/autocomplete",
  });

export const getUser = userId =>
  axios({
    method: "get",
    url: `api/users/${userId}`,
  });

export const patchUser = (id, user) =>
  axios({
    method: "patch",
    url: `api/users/${id}`,
    data: user,
    headers: {
      "Content-Type": false,
      "processData": false,
    },
  });

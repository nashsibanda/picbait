import axios from "axios";
import { setToken } from "./misc_util";

setToken(axios);

export const getFollows = (userId, params) =>
  axios({
    method: "get",
    url: `api/users/${userId}/follows`,
    params,
  });

export const postFollow = userId =>
  axios({
    method: "post",
    url: `api/users/${userId}/follow`,
  });

export const deleteFollow = userId =>
  axios({
    method: "delete",
    url: `api/users/${userId}/follow`,
  });

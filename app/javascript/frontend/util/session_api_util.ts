import axios from 'axios'
import { setToken } from "./misc_util";

setToken(axios)

export const signup = user =>
  axios({
    method: "post",
    url: "api/users",
    data: { user },
  });

export const login = user =>
  axios({
    method: "post",
    url: "api/session",
    data: { user },
  });

export const logout = () =>
  axios({
    method: "delete",
    url: "api/session",
  });

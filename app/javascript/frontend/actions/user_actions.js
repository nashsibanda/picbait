export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
import * as UsersAPIUtil from "./../util/users_api_util.js";
import { loadedUsers, loadingUsers } from "./fetching_actions.js";
import { postingUsers, postedUsers } from "./posting_actions.js";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

export const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors,
});

export const fetchUsers = filters => dispatch => {
  dispatch(loadingUsers());
  UsersAPIUtil.getUsers(filters).then(users => {
    dispatch(receiveUsers(users));
    dispatch(loadedUsers());
  });
};

export const fetchUser = userId => dispatch => {
  dispatch(loadingUsers());
  UsersAPIUtil.getUser(userId).then(user => {
    dispatch(receiveUser(user));
    dispatch(loadedUsers());
  });
};

export const updateUser = (id, formUser) => dispatch => {
  dispatch(postingUsers());
  UsersAPIUtil.patchUser(id, formUser).then(
    user => {
      dispatch(receiveUser(user));
      dispatch(postedUsers());
    },
    errors => {
      dispatch(receiveUserErrors(errors));
      dispatch(postedUsers());
    }
  );
};

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
import * as UsersAPIUtil from "./../util/users_api_util.js";

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
  UsersAPIUtil.getUsers(filters).then(users => dispatch(receiveUsers(users)));
};

export const fetchUser = userId => dispatch => {
  UsersAPIUtil.getUser(userId).then(user => dispatch(receiveUser(user)));
};

export const updateUser = (id, formUser) => dispatch => {
  UsersAPIUtil.patchUser(id, formUser).then(
    user => {
      dispatch(receiveUser(user));
      dispatch(push(`/users/${id}`));
    },
    errors => {
      dispatch(receiveUserErrors(errors));
    }
  );
};

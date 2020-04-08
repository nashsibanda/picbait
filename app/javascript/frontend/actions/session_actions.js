export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
import * as SessionAPIUtil from "./../util/session_api_util";

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const login = user => dispatch => {
  SessionAPIUtil.login(user).then(
    currentUser => {
      dispatch(receiveCurrentUser(currentUser));
    },
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  );
};

export const logout = () => dispatch => {
  SessionAPIUtil.logout().then(() => {
    dispatch(logoutCurrentUser());
  });
};

export const signup = formUser => dispatch => {
  SessionAPIUtil.signup(formUser).then(
    newUser => dispatch(receiveCurrentUser(newUser)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  );
};

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
import * as SessionAPIUtil from "./../util/session_api_util";
import { loadingSession, loadedSession } from "./fetching_actions";

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
  dispatch(loadingSession());
  SessionAPIUtil.login(user).then(
    currentUser => {
      dispatch(receiveCurrentUser(currentUser));
      dispatch(loadedSession());
    },
    errors => {
      dispatch(receiveSessionErrors(errors.responseJSON));
      dispatch(loadedSession());
    }
  );
};

export const logout = () => dispatch => {
  SessionAPIUtil.logout().then(() => {
    dispatch(logoutCurrentUser());
  });
};

export const signup = formUser => dispatch => {
  dispatch(loadingSession());
  SessionAPIUtil.signup(formUser).then(
    newUser => {
      dispatch(receiveCurrentUser(newUser));
      dispatch(loadedSession());
    },
    errors => {
      dispatch(receiveSessionErrors(errors.responseJSON));
      dispatch(loadedSession());
    }
  );
};

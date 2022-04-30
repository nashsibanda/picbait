import { Dispatch } from 'redux'
import { ApiError, ApiErrors, SessionUser, UserEntity } from '../types/entities'
import * as SessionAPIUtil from '../util/session_api_util'
import { loadedSession, loadingSession } from './fetching_actions'

export enum SessionActionTypes {
  RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER',
  LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER',
  RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS',
}

export interface ReceiveCurrentUserAction {
  type: SessionActionTypes.RECEIVE_CURRENT_USER
  currentUser: UserEntity
}
export interface LogoutCurrentUserAction {
  type: SessionActionTypes.LOGOUT_CURRENT_USER
}
export interface ReceiveSessionErrorsAction {
  type: SessionActionTypes.RECEIVE_SESSION_ERRORS
  errors: ApiErrors
}

export type SessionAction = ReceiveCurrentUserAction | LogoutCurrentUserAction | ReceiveSessionErrorsAction

const receiveCurrentUser = (currentUser: UserEntity): ReceiveCurrentUserAction => ({
  type: SessionActionTypes.RECEIVE_CURRENT_USER,
  currentUser,
})

const logoutCurrentUser = (): LogoutCurrentUserAction => ({
  type: SessionActionTypes.LOGOUT_CURRENT_USER,
})

const receiveSessionErrors = (errors: ApiErrors): ReceiveSessionErrorsAction => ({
  type: SessionActionTypes.RECEIVE_SESSION_ERRORS,
  errors,
})

export const login = (user: SessionUser) => (dispatch: Dispatch) => {
  dispatch(loadingSession())
  SessionAPIUtil.login(user).then(
    ({ data: currentUser }) => {
      dispatch(receiveCurrentUser(currentUser))
      dispatch(loadedSession())
    },
    (errors: ApiError) => {
      dispatch(receiveSessionErrors(errors.response.data))
      dispatch(loadedSession())
    }
  )
}

export const loginRodrick = () => (dispatch: Dispatch) => {
  dispatch(loadingSession())
  const rodrick = { username: 'rodrick', password: 'rodrick' }
  SessionAPIUtil.login(rodrick).then(
    ({ data: user }) => {
      dispatch(receiveCurrentUser(user))
      dispatch(loadedSession())
    },
    (errors: ApiError) => {
      dispatch(receiveSessionErrors(errors.response.data))
      dispatch(loadedSession())
    }
  )
}

export const logout = () => (dispatch: Dispatch) => {
  SessionAPIUtil.logout().then(() => {
    dispatch(logoutCurrentUser())
  })
}

export const signup = (formUser: SessionUser) => (dispatch: Dispatch) => {
  dispatch(loadingSession())
  SessionAPIUtil.signup(formUser).then(
    ({ data: user }) => {
      dispatch(receiveCurrentUser(user))
      dispatch(loadedSession())
    },
    (errors: ApiError) => {
      dispatch(receiveSessionErrors(errors.response.data))
      dispatch(loadedSession())
    }
  )
}

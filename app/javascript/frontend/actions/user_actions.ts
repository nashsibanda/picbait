import { Dispatch } from 'redux'
import { ApiErrors, User, UserEntity } from '../util/types.js'
import * as UsersAPIUtil from './../util/users_api_util.js'
import { loadedUsers, loadingUsers } from './fetching_actions.js'
import { postedUsers, postingUsers } from './posting_actions.js'

export enum UserActionTypes {
  RECEIVE_USERS = 'RECEIVE_USERS',
  RECEIVE_USER = 'RECEIVE_USER',
  RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS',
}

type ReceiveUsersAction = {
  type: UserActionTypes.RECEIVE_USERS
  users: UserEntity[]
}

type ReceiveUserAction = {
  type: UserActionTypes.RECEIVE_USER
  user: UserEntity
}
type ReceiveUserErrorsAction = {
  type: UserActionTypes.RECEIVE_USER_ERRORS
  errors: ApiErrors
}

export const receiveUsers = (users: UserEntity[]): ReceiveUsersAction => ({
  type: UserActionTypes.RECEIVE_USERS,
  users,
})

export const receiveUser = (user: UserEntity): ReceiveUserAction => ({
  type: UserActionTypes.RECEIVE_USER,
  user,
})

export const receiveUserErrors = (errors: ApiErrors): ReceiveUserErrorsAction => ({
  type: UserActionTypes.RECEIVE_USER_ERRORS,
  errors,
})

export type UserAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof receiveUserErrors>
  | ReturnType<typeof receiveUsers>

export const fetchUsers = (filters: UsersAPIUtil.GetUsersParams) => (dispatch: Dispatch) => {
  dispatch(loadingUsers())
  UsersAPIUtil.getUsers(filters).then(({ data }: { data: UserEntity[] }) => {
    dispatch(receiveUsers(data))
    dispatch(loadedUsers())
  })
}

export const fetchUser = (userId: number) => (dispatch: Dispatch) => {
  dispatch(loadingUsers())
  UsersAPIUtil.getUser(userId).then(({ data }: { data: UserEntity }) => {
    dispatch(receiveUser(data))
    dispatch(loadedUsers())
  })
}

export const updateUser = (id: number, formUser: User) => (dispatch: Dispatch) => {
  dispatch(postingUsers())
  UsersAPIUtil.patchUser(id, formUser).then(
    user => {
      dispatch(receiveUser(user.data))
      dispatch(postedUsers())
    },
    errors => {
      dispatch(receiveUserErrors(errors.data))
      dispatch(postedUsers())
    }
  )
}

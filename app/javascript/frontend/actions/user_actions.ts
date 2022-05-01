import { ApiError, ApiErrors, UserEntity } from '../types/entities.js'
import { GlobalDispatch } from '../types/state.js'
import * as UsersAPIUtil from '../util/users_api_util.js'
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

export const fetchUsers = (filters: UsersAPIUtil.GetUsersParams) => (dispatch: GlobalDispatch) => {
  dispatch(loadingUsers())
  UsersAPIUtil.getUsers(filters).then(({ data: users }) => {
    dispatch(receiveUsers(users))
    dispatch(loadedUsers())
  })
}

export const fetchUser = (userId: string) => (dispatch: GlobalDispatch) => {
  dispatch(loadingUsers())
  UsersAPIUtil.getUser(userId).then(({ data: user }) => {
    dispatch(receiveUser(user))
    dispatch(loadedUsers())
  })
}

export const updateUser = (id: string, formUser: FormData) => (dispatch: GlobalDispatch) => {
  dispatch(postingUsers())
  UsersAPIUtil.patchUser(id, formUser).then(
    user => {
      dispatch(receiveUser(user.data))
      dispatch(postedUsers())
    },
    (errors: ApiError) => {
      dispatch(receiveUserErrors(errors.response.data))
      dispatch(postedUsers())
    }
  )
}

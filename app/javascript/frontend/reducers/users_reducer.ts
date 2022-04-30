import { ReceiveCurrentUserAction, SessionActionTypes } from '../actions/session_actions'
import { UserAction, UserActionTypes } from '../actions/user_actions'
import { UserEntity } from '../util/types'

const usersReducer = (state: Record<string, UserEntity> = {}, action: ReceiveCurrentUserAction | UserAction) => {
  Object.freeze(state)
  switch (action.type) {
    case SessionActionTypes.RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.slug]: action.currentUser,
      })
    case UserActionTypes.RECEIVE_USERS:
      const usersOutput: Record<string, UserEntity> = {}
      action.users.forEach(user => {
        usersOutput[user.slug] = user
      })
      return usersOutput
    case UserActionTypes.RECEIVE_USER:
      return Object.assign({}, state, {
        [action.user.slug]: action.user,
      })
    default:
      return state
  }
}

export default usersReducer

import { ReceiveCurrentUserAction, SessionActionTypes } from '../actions/session_actions'
import { UserAction, UserActionTypes } from '../actions/user_actions'
import { UsersState } from '../types/state'

const usersReducer = (state: UsersState = {}, action: ReceiveCurrentUserAction | UserAction) => {
  Object.freeze(state)
  switch (action.type) {
    case SessionActionTypes.RECEIVE_CURRENT_USER:
      return { ...state, [action.currentUser.slug]: action.currentUser }
    case UserActionTypes.RECEIVE_USERS:
      const usersOutput: UsersState = {}
      action.users.forEach(user => {
        usersOutput[user.slug] = user
      })
      return usersOutput
    case UserActionTypes.RECEIVE_USER:
      return { ...state, [action.user.slug]: action.user }
    default:
      return state
  }
}

export default usersReducer

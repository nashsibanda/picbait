import { ReceiveCurrentUserAction, SessionActionTypes } from '../actions/session_actions'
import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions'

const usersReducer = (state = {}, action: ReceiveCurrentUserAction) => {
  Object.freeze(state)
  switch (action.type) {
    case SessionActionTypes.RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.slug]: action.currentUser,
      })
    case RECEIVE_USERS:
      const usersOutput = {}
      action.users.forEach(user => {
        usersOutput[user.slug] = user
      })
      return usersOutput
    case RECEIVE_USER:
      return Object.assign({}, state, {
        [action.user.slug]: action.user,
      })
    default:
      return state
  }
}

export default usersReducer

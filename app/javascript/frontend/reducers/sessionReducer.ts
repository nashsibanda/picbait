import { SessionAction, SessionActionTypes } from '../actions/sessionActions'
import { SessionState } from '../types/state'

const nullSession = {
  currentUser: null,
}

const sessionReducer = (state: SessionState = nullSession, action: SessionAction) => {
  Object.freeze(state)
  switch (action.type) {
    case SessionActionTypes.RECEIVE_CURRENT_USER:
      const { id, slug } = action.currentUser
      return { currentUser: { id, slug } }
    case SessionActionTypes.LOGOUT_CURRENT_USER:
      return nullSession
    default:
      return state
  }
}

export default sessionReducer

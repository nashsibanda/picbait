import { SessionAction, SessionActionTypes } from '../actions/session_actions'

const sessionErrorsReducer = (state = [], action: SessionAction) => {
  Object.freeze(state)
  switch (action.type) {
    case SessionActionTypes.RECEIVE_SESSION_ERRORS:
      return action.errors
    case SessionActionTypes.RECEIVE_CURRENT_USER:
      return []
    default:
      return state
  }
}

export default sessionErrorsReducer

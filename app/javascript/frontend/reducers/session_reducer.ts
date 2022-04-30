import { SessionAction, SessionActionTypes } from '../actions/session_actions'

const _nullSession = {
  currentUser: null,
}

const sessionReducer = (state = _nullSession, action: SessionAction) => {
  Object.freeze(state)
  switch (action.type) {
    case SessionActionTypes.RECEIVE_CURRENT_USER:
      const { id, slug } = action.currentUser
      const userObj = { id: id, slug: slug }
      return Object.assign({}, { currentUser: userObj })
    case SessionActionTypes.LOGOUT_CURRENT_USER:
      return _nullSession
    default:
      return state
  }
}

export default sessionReducer

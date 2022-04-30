import { UserAction, UserActionTypes } from '../actions/user_actions'
import { ApiErrors } from '../util/types'

const userErrorsReducer = (state: ApiErrors = [], action: UserAction): ApiErrors => {
  Object.freeze(state)
  switch (action.type) {
    case UserActionTypes.RECEIVE_USER_ERRORS:
      return action.errors
    case UserActionTypes.RECEIVE_USER:
      return []
    default:
      return state
  }
}

export default userErrorsReducer

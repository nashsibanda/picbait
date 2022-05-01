import { UserAction, UserActionTypes } from '../actions/userActions'
import { ApiErrors } from '../types/entities'

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

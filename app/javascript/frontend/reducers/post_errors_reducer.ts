import { PostAction, PostActionTypes } from '../actions/post_actions'
import { ApiErrors } from '../types/entities'

const postErrorsReducer = (state: ApiErrors = [], action: PostAction) => {
  Object.freeze(state)
  switch (action.type) {
    case PostActionTypes.RECEIVE_POST_ERRORS:
      return action.errors
    case PostActionTypes.RECEIVE_POST:
      return []
    case PostActionTypes.CLEAR_POST:
      return []
    default:
      return state
  }
}

export default postErrorsReducer

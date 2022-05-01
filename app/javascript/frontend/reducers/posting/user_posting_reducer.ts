import { PostingAction, PostingActionTypes } from '../../actions/posting_actions'

const userPostingReducer = (state = false, action: PostingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case PostingActionTypes.POSTING_USERS:
      return true
    case PostingActionTypes.POSTED_USERS:
      return false
    default:
      return state
  }
}

export default userPostingReducer

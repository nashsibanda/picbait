import { PostingAction, PostingActionTypes } from '../../actions/postingActions'

const postPostingReducer = (state = false, action: PostingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case PostingActionTypes.POSTING_POSTS:
      return true
    case PostingActionTypes.POSTED_POSTS:
      return false
    default:
      return state
  }
}

export default postPostingReducer

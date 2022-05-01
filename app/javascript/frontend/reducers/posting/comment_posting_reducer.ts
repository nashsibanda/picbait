import { PostingAction, PostingActionTypes } from '../../actions/posting_actions'

const commentPostingReducer = (state = false, action: PostingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case PostingActionTypes.POSTING_COMMENTS:
      return true
    case PostingActionTypes.POSTED_COMMENTS:
      return false
    default:
      return state
  }
}

export default commentPostingReducer

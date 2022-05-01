import { CommentAction, CommentActionTypes } from '../actions/commentActions'
import { CommentsState } from '../types/state'

const commentsReducer = (state: CommentsState = {}, action: CommentAction) => {
  Object.freeze(state)
  switch (action.type) {
    case CommentActionTypes.RECEIVE_COMMENTS:
      const commentsOutput: CommentsState = {}
      action.comments.forEach(cmnt => {
        commentsOutput[cmnt.id] = cmnt
      })
      return commentsOutput
    case CommentActionTypes.RECEIVE_COMMENT:
      const { comment } = action
      return { ...state, [comment.id]: comment }
    case CommentActionTypes.CLEAR_COMMENT:
      const shortenedCommentsOutput = { ...state }
      delete shortenedCommentsOutput[action.comment.id]
      return shortenedCommentsOutput
    default:
      return state
  }
}

export default commentsReducer

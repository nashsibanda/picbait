import { CommentAction, CommentActionTypes } from '../actions/comment_actions'
import { CommentEntity } from '../util/types'

const commentsReducer = (state: Record<number, CommentEntity> = {}, action: CommentAction) => {
  Object.freeze(state)
  switch (action.type) {
    case CommentActionTypes.RECEIVE_COMMENTS:
      const commentsOutput: Record<number, CommentEntity> = {}
      action.comments.forEach(cmnt => {
        commentsOutput[cmnt.id] = cmnt
      })
      return commentsOutput
    case CommentActionTypes.RECEIVE_COMMENT:
      const { comment } = action
      return Object.assign({}, state, { [comment.id]: comment })
    case CommentActionTypes.CLEAR_COMMENT:
      const shortenedCommentsOutput = Object.assign({}, state)
      delete shortenedCommentsOutput[action.comment.id]
      return shortenedCommentsOutput
    default:
      return state
  }
}

export default commentsReducer

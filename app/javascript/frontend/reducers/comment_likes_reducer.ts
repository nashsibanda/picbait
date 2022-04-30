import { CommentAction, CommentActionTypes } from '../actions/comment_actions'
import { LikeAction, LikeActionTypes } from '../actions/like_actions'
import { Like } from '../util/types'

const commentLikesReducer = (state: Record<number, Record<number, Like>> = {}, action: LikeAction | CommentAction) => {
  Object.freeze(state)
  switch (action.type) {
    case CommentActionTypes.RECEIVE_COMMENTS:
      const likesOutput: Record<number, Record<number, Like>> = {}
      action.comments.forEach(cmnt => {
        const commentLikes: Record<number, Like> = {}
        cmnt.likes.forEach(lk => {
          commentLikes[lk.api_user_id] = lk
        })
        likesOutput[cmnt.id] = commentLikes
      })
      return likesOutput
    case CommentActionTypes.RECEIVE_COMMENT:
      const { comment } = action
      const thisCommentLikes: Record<number, Like> = {}
      comment.likes.forEach(like => {
        thisCommentLikes[like.api_user_id] = like
      })
      return { ...state, [comment.id]: thisCommentLikes }
    case LikeActionTypes.RECEIVE_COMMENT_LIKE:
      const stateCommentLikes = { ...state }
      const { like } = action
      const likedComment = stateCommentLikes[like.likeable_id]
      likedComment[like.api_user_id] = like
      stateCommentLikes[like.likeable_id] = likedComment
      return stateCommentLikes
    case LikeActionTypes.CLEAR_COMMENT_LIKE:
      const oldLike = action.like
      const oldCommentLikes = { ...state }
      const commentToClear = oldCommentLikes[oldLike.likeable_id]
      delete commentToClear[oldLike.api_user_id]
      oldCommentLikes[oldLike.likeable_id] = commentToClear
      return oldCommentLikes
    default:
      return state
  }
}

export default commentLikesReducer

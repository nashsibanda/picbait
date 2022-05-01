import { ApiErrors, CommentEntity } from '../types/entities'
import { GlobalDispatch } from '../types/state'
import * as CommentsAPIUtil from '../util/commentsApiUtil'
import { postedComments, postingComments } from './postingActions'

export enum CommentActionTypes {
  RECEIVE_COMMENTS = 'RECEIVE_COMMENTS',
  RECEIVE_COMMENT = 'RECEIVE_COMMENT',
  CLEAR_COMMENT = 'CLEAR_COMMENT',
  RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS',
}

type MultiCommentsAction = {
  type: CommentActionTypes.RECEIVE_COMMENTS
  comments: CommentEntity[]
}

type SingleCommentAction = {
  type: CommentActionTypes.RECEIVE_COMMENT | CommentActionTypes.CLEAR_COMMENT
  comment: CommentEntity
}

export type CommentErrorsAction = {
  type: CommentActionTypes.RECEIVE_COMMENT_ERRORS
  errors: ApiErrors
}

export type CommentAction = MultiCommentsAction | SingleCommentAction

export const receiveComments = (comments: CommentEntity[]): MultiCommentsAction => ({
  type: CommentActionTypes.RECEIVE_COMMENTS,
  comments,
})

const receiveComment = (comment: CommentEntity): SingleCommentAction => ({
  type: CommentActionTypes.RECEIVE_COMMENT,
  comment,
})

const clearComment = (comment: CommentEntity): SingleCommentAction => ({
  type: CommentActionTypes.CLEAR_COMMENT,
  comment,
})

const receiveCommentErrors = (errors: ApiErrors): CommentErrorsAction => ({
  type: CommentActionTypes.RECEIVE_COMMENT_ERRORS,
  errors,
})

export const createComment = (formComment: FormData) => (dispatch: GlobalDispatch) => {
  dispatch(postingComments())
  CommentsAPIUtil.postComment(formComment).then(
    ({ data: comment }) => {
      dispatch(receiveComment(comment))
      dispatch(postedComments())
    },
    ({ data }: { data: ApiErrors }) => {
      dispatch(receiveCommentErrors(data))
      dispatch(postedComments())
    }
  )
}

export const removeComment = (id: number) => (dispatch: GlobalDispatch) => {
  dispatch(postingComments())
  CommentsAPIUtil.deleteComment(id).then(
    ({ data: comment }) => {
      dispatch(clearComment(comment))
      dispatch(postedComments())
    },
    ({ data }: { data: ApiErrors }) => {
      dispatch(receiveCommentErrors(data))
      dispatch(postedComments())
    }
  )
}

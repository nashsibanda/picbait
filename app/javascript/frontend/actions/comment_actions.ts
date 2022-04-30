import { Dispatch } from 'redux'
import * as CommentsAPIUtil from '../util/comments_api_util'
import { ApiErrors, CommentEntity } from '../util/types'
import { postedComments, postingComments } from './posting_actions'

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

export const createComment = (formComment: FormData) => (dispatch: Dispatch) => {
  dispatch(postingComments())
  CommentsAPIUtil.postComment(formComment).then(
    ({ data }: { data: CommentEntity }) => {
      dispatch(receiveComment(data))
      dispatch(postedComments())
    },
    ({ data }: { data: ApiErrors }) => {
      dispatch(receiveCommentErrors(data))
      dispatch(postedComments())
    }
  )
}

export const removeComment = (id: number) => (dispatch: Dispatch) => {
  dispatch(postingComments())
  CommentsAPIUtil.deleteComment(id).then(
    ({ data }: { data: CommentEntity }) => {
      dispatch(clearComment(data))
      dispatch(postedComments())
    },
    ({ data }: { data: ApiErrors }) => {
      dispatch(receiveCommentErrors(data))
      dispatch(postedComments())
    }
  )
}

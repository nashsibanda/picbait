import { Dispatch } from 'redux'
import { Like } from '../util/types'
import * as LikesAPIUtil from './../util/likes_api_util'

export enum LikeActionTypes {
  RECEIVE_POST_LIKE = 'RECEIVE_POST_LIKE',
  CLEAR_POST_LIKE = 'CLEAR_POST_LIKE',
  RECEIVE_COMMENT_LIKE = 'RECEIVE_COMMENT_LIKE',
  CLEAR_COMMENT_LIKE = 'CLEAR_COMMENT_LIKE',
}

export type LikeAction = {
  type: LikeActionTypes
  like: Like
}

const receivePostLike = (like: Like): LikeAction => ({
  type: LikeActionTypes.RECEIVE_POST_LIKE,
  like,
})

const clearPostLike = (like: Like): LikeAction => ({
  type: LikeActionTypes.CLEAR_POST_LIKE,
  like,
})

const receiveCommentLike = (like: Like): LikeAction => ({
  type: LikeActionTypes.RECEIVE_COMMENT_LIKE,
  like,
})

const clearCommentLike = (like: Like): LikeAction => ({
  type: LikeActionTypes.CLEAR_COMMENT_LIKE,
  like,
})

export const createPostLike = (postId: number) => (dispatch: Dispatch) => {
  LikesAPIUtil.postPostLike(postId).then(like => dispatch(receivePostLike(like.data)))
}

export const deletePostLike = (id: number) => (dispatch: Dispatch) => {
  LikesAPIUtil.deleteLike(id).then(like => dispatch(clearPostLike(like.data)))
}

export const createCommentLike = (commentId: number) => (dispatch: Dispatch) => {
  LikesAPIUtil.postCommentLike(commentId).then(like => dispatch(receiveCommentLike(like.data)))
}

export const deleteCommentLike = (id: number) => (dispatch: Dispatch) => {
  LikesAPIUtil.deleteLike(id).then(like => dispatch(clearCommentLike(like.data)))
}

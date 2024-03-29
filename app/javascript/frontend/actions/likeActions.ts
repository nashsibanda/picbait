import { Like } from '../types/entities'
import { GlobalDispatch } from '../types/state'
import * as LikesAPIUtil from '../util/likesApiUtil'

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

export const createPostLike = (postId: number) => (dispatch: GlobalDispatch) => {
  LikesAPIUtil.postPostLike(postId).then(({ data: like }) => dispatch(receivePostLike(like)))
}

export const deletePostLike = (id: number) => (dispatch: GlobalDispatch) => {
  LikesAPIUtil.deleteLike(id).then(({ data: like }) => dispatch(clearPostLike(like)))
}

export const createCommentLike = (commentId: number) => (dispatch: GlobalDispatch) => {
  LikesAPIUtil.postCommentLike(commentId).then(({ data: like }) => dispatch(receiveCommentLike(like)))
}

export const deleteCommentLike = (id: number) => (dispatch: GlobalDispatch) => {
  LikesAPIUtil.deleteLike(id).then(({ data: like }) => dispatch(clearCommentLike(like)))
}

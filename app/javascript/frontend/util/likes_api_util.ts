import axios, { AxiosPromise } from 'axios'
import { setToken } from './misc_util'
import { Like } from './types'

setToken(axios)

export const postPostLike = (postId: number): AxiosPromise<Like> => axios.post<Like>(`api/posts/${postId}/likes`)

export const postCommentLike = (commentId: number): AxiosPromise<Like> =>
  axios.post<Like>(`api/comments/${commentId}/likes`)

export const deleteLike = (id: number): AxiosPromise<Like> => axios.delete<Like>(`api/likes/${id}`)

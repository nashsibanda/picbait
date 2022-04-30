import axios, { AxiosPromise } from 'axios'
import { CommentEntity } from '../types/entities'
import { setToken } from './misc_util'

setToken(axios)

export const getComments = (postId: number): AxiosPromise<CommentEntity[]> =>
  axios.get<CommentEntity[]>(`api/posts/${postId}/comments`)

export const getComment = (id: number): AxiosPromise<CommentEntity> => axios.get<CommentEntity>(`api/comments/${id}`)

export const postComment = (comment: FormData): AxiosPromise<CommentEntity> =>
  axios.post<CommentEntity>('api/comments', {
    data: comment,
    headers: {
      'Content-Type': false,
      processData: false,
    },
  })

export const patchComment = (id: number, comment: FormData): AxiosPromise<CommentEntity> =>
  axios.patch<CommentEntity>(`api/comments/${id}`, {
    data: comment,
  })

export const deleteComment = (id: number): AxiosPromise<CommentEntity> =>
  axios.delete<CommentEntity>(`api/comments/${id}`)

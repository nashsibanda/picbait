import axios from 'axios'
import { setToken } from './misc_util'

setToken(axios)

export const getComments = (postId: number) =>
  axios({
    method: 'get',
    url: `api/posts/${postId}/comments`,
  })

export const getComment = (id: number) =>
  axios({
    method: 'get',
    url: `api/comments/${id}`,
  })

export const postComment = (comment: FormData) =>
  axios({
    method: 'post',
    url: 'api/comments',
    data: comment,
    headers: {
      'Content-Type': false,
      processData: false,
    },
  })

export const patchComment = (id: number, comment: FormData) =>
  axios({
    method: 'patch',
    url: `api/comments/${id}`,
    data: comment,
  })

export const deleteComment = (id: number) =>
  axios({
    method: 'delete',
    url: `api/comments/${id}`,
  })

import axios, { AxiosPromise } from 'axios'
import { PostEntity } from '../types/entities'
import { setToken } from './miscUtil'

setToken(axios)

export const getFeedPosts = (page: number): AxiosPromise<PostEntity[]> =>
  axios.get<PostEntity[]>(`api/posts`, { params: { page } })

export const getUserPosts = (userId: string, page: number): AxiosPromise<PostEntity[]> =>
  axios.get<PostEntity[]>(`api/users/${userId}/posts`, { params: { page } })

export const getPost = (id: number): AxiosPromise<PostEntity> => axios.get<PostEntity>(`api/posts/${id}`)

export const postPost = (post: FormData): AxiosPromise<PostEntity> =>
  axios.post<PostEntity>('api/posts', {
    data: post,
    headers: {
      'Content-Type': false,
      processData: false,
    },
  })

export const patchPost = (id: number, post: FormData): AxiosPromise<PostEntity> =>
  axios.patch<PostEntity>(`api/posts/${id}`, { data: post })

export const deletePost = (id: number): AxiosPromise<PostEntity> => axios.delete<PostEntity>(`api/posts/${id}`)

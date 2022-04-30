import axios from 'axios'
import { setToken } from './misc_util'
import { User } from './types'

setToken(axios)

export type GetUsersParams = {
  post_id?: number
  user_id?: number
}

export const getUsers = (params: GetUsersParams) =>
  axios({
    method: 'get',
    url: 'api/users',
    params,
  })

export const getUsersAutocomplete = () =>
  axios({
    method: 'get',
    url: 'api/users/autocomplete',
  })

export const getUser = (userId: number) =>
  axios({
    method: 'get',
    url: `api/users/${userId}`,
  })

export const patchUser = (id: number, user: User) =>
  axios({
    method: 'patch',
    url: `api/users/${id}`,
    data: user,
    headers: {
      'Content-Type': false,
      processData: false,
    },
  })

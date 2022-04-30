import axios, { AxiosPromise } from 'axios'
import { setToken } from './misc_util'
import { AutocompleteUser, User, UserEntity } from './types'

setToken(axios)

export type GetUsersParams = {
  // eslint-disable-next-line camelcase
  post_id?: number
  // eslint-disable-next-line camelcase
  user_id?: number
}

export const getUsers = (params: GetUsersParams): AxiosPromise<UserEntity[]> =>
  axios.get<UserEntity[]>('api/users', { params })

export const getUsersAutocomplete = (): AxiosPromise<AutocompleteUser[]> =>
  axios.get<AutocompleteUser[]>('api/users/autocomplete')

export const getUser = (userId: number): AxiosPromise<UserEntity> => axios.get<UserEntity>(`api/users/${userId}`)

export const patchUser = (id: number, user: User): AxiosPromise<UserEntity> =>
  axios.patch<UserEntity>(`api/users/${id}`, {
    data: user,
    headers: {
      'Content-Type': false,
      processData: false,
    },
  })

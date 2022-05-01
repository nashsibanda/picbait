import axios, { AxiosPromise } from 'axios'
import { AutocompleteUser, UserEntity } from '../types/entities'
import { setToken } from './misc_util'

setToken(axios)

export type GetUsersParams = {
  // eslint-disable-next-line camelcase
  post_id?: number
  // eslint-disable-next-line camelcase
  user_id?: string
}

export const getUsers = (params: GetUsersParams): AxiosPromise<UserEntity[]> =>
  axios.get<UserEntity[]>('api/users', { params })

export const getUsersAutocomplete = (): AxiosPromise<AutocompleteUser[]> =>
  axios.get<AutocompleteUser[]>('api/users/autocomplete')

export const getUser = (userId: string): AxiosPromise<UserEntity> => axios.get<UserEntity>(`api/users/${userId}`)

export const patchUser = (id: string, user: FormData): AxiosPromise<UserEntity> =>
  axios.patch<UserEntity>(`api/users/${id}`, {
    data: user,
    headers: {
      'Content-Type': false,
      processData: false,
    },
  })

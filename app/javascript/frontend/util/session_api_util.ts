import axios, { AxiosPromise } from 'axios'
import { SessionUser, UserEntity } from '../types/entities'
import { setToken } from './misc_util'

setToken(axios)

export const signup = (user: SessionUser): AxiosPromise<UserEntity> =>
  axios.post<UserEntity>('api/users', { data: { user } })

export const login = (user: SessionUser): AxiosPromise<UserEntity> =>
  axios.post<UserEntity>('api/session', { data: { user } })

export const logout = (): AxiosPromise<null> => axios.delete<null>('api/session')

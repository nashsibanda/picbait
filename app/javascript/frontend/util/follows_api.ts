import axios, { AxiosPromise } from 'axios'
import { setToken } from './misc_util'
import { Follow, FollowType } from './types'

setToken(axios)

export const getFollows = (userId: number, followType: FollowType): AxiosPromise<Follow[]> =>
  axios.get<Follow[]>(`api/users/${userId}/follows`, { params: { follow_type: followType } })

export const postFollow = (userId: number): AxiosPromise<Follow> => axios.post<Follow>(`api/users/${userId}/follow`)

export const deleteFollow = (userId: number): AxiosPromise<Follow> => axios.delete<Follow>(`api/users/${userId}/follow`)

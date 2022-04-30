import axios from 'axios'
import { setToken } from './misc_util'
import { FollowType } from './types'

setToken(axios)

export const getFollows = (userId: number, follow_type: FollowType) =>
  axios({
    method: 'get',
    url: `api/users/${userId}/follows`,
    params: {
      follow_type: follow_type,
    },
  })

export const postFollow = (userId: number) =>
  axios({
    method: 'post',
    url: `api/users/${userId}/follow`,
  })

export const deleteFollow = (userId: number) =>
  axios({
    method: 'delete',
    url: `api/users/${userId}/follow`,
  })

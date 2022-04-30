import axios from 'axios'
import { setToken } from './misc_util'

setToken(axios)

type FollowsParams = {
  follow_type: 'followers' | 'followings'
  user_id: number
}

export const getFollows = (userId: number, params: FollowsParams) =>
  axios({
    method: 'get',
    url: `api/users/${userId}/follows`,
    params,
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

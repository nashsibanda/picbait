import axios from 'axios'
import { setToken } from './misc_util'
import { SessionUser } from './types'

setToken(axios)

export const signup = (user: SessionUser) =>
  axios({
    method: 'post',
    url: 'api/users',
    data: { user },
  })

export const login = (user: SessionUser) =>
  axios({
    method: 'post',
    url: 'api/session',
    data: { user },
  })

export const logout = () =>
  axios({
    method: 'delete',
    url: 'api/session',
  })

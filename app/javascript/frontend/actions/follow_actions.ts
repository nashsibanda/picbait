import { Dispatch } from 'redux'
import { Follow, FollowType } from '../util/types'
import * as FollowsAPIUtil from './../util/follows_api'
import { loadedFollows, loadingFollows } from './fetching_actions'

export enum FollowActionTypes {
  RECEIVE_FOLLOWINGS = 'RECEIVE_FOLLOWINGS',
  RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS',
  RECEIVE_FOLLOWING = 'RECEIVE_FOLLOWING',
  RECEIVE_FOLLOWER = 'RECEIVE_FOLLOWER',
  RECEIVE_FOLLOW = 'RECEIVE_FOLLOW',
  CLEAR_FOLLOWER = 'CLEAR_FOLLOW',
  CLEAR_FOLLOWING = 'CLEAR_FOLLOW',
}

type SingleFollowAction = {
  type:
    | FollowActionTypes.RECEIVE_FOLLOW
    | FollowActionTypes.RECEIVE_FOLLOWER
    | FollowActionTypes.RECEIVE_FOLLOWING
    | FollowActionTypes.CLEAR_FOLLOWER
    | FollowActionTypes.CLEAR_FOLLOWING
  follow: Follow
}

type MultiFollowAction = {
  type: FollowActionTypes.RECEIVE_FOLLOWERS | FollowActionTypes.RECEIVE_FOLLOWINGS
  follows: Follow[]
}

export type FollowAction = SingleFollowAction | MultiFollowAction

const receiveFollowers = (follows: Follow[]): MultiFollowAction => ({
  type: FollowActionTypes.RECEIVE_FOLLOWERS,
  follows,
})

const receiveFollowings = (follows: Follow[]): MultiFollowAction => ({
  type: FollowActionTypes.RECEIVE_FOLLOWINGS,
  follows,
})

const receiveFollower = (follow: Follow): SingleFollowAction => ({
  type: FollowActionTypes.RECEIVE_FOLLOWER,
  follow,
})

const receiveFollowing = (follow: Follow): SingleFollowAction => ({
  type: FollowActionTypes.RECEIVE_FOLLOWING,
  follow,
})

const clearFollower = (follow: Follow): SingleFollowAction => ({
  type: FollowActionTypes.CLEAR_FOLLOWER,
  follow,
})

const clearFollowing = (follow: Follow): SingleFollowAction => ({
  type: FollowActionTypes.CLEAR_FOLLOWING,
  follow,
})

export const fetchFollowers = (userId: number) => (dispatch: Dispatch) => {
  dispatch(loadingFollows())
  FollowsAPIUtil.getFollows(userId, FollowType.followers).then(({ data }: { data: Follow[] }) => {
    dispatch(receiveFollowers(data))
    dispatch(loadedFollows())
  })
}

export const fetchFollowings = (userId: number) => (dispatch: Dispatch) => {
  dispatch(loadingFollows())
  FollowsAPIUtil.getFollows(userId, FollowType.followings).then(({ data }: { data: Follow[] }) => {
    dispatch(receiveFollowings(data))
    dispatch(loadedFollows())
  })
}

export const createFollow = (userId: number) => (dispatch: Dispatch) => {
  FollowsAPIUtil.postFollow(userId).then(({ data }: { data: Follow }) => {
    dispatch(receiveFollower(data))
  })
}

export const deleteFollow = (userId: number) => (dispatch: Dispatch) => {
  FollowsAPIUtil.deleteFollow(userId).then(({ data }: { data: Follow }) => {
    dispatch(clearFollower(data))
  })
}

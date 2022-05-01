import { Follow, FollowType } from '../types/entities'
import { GlobalDispatch } from '../types/state'
import * as FollowsAPIUtil from '../util/followsApi'
import { loadedFollows, loadingFollows } from './fetchingActions'

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

const clearFollower = (follow: Follow): SingleFollowAction => ({
  type: FollowActionTypes.CLEAR_FOLLOWER,
  follow,
})

export const fetchFollowers = (userSlug: string) => (dispatch: GlobalDispatch) => {
  dispatch(loadingFollows())
  FollowsAPIUtil.getFollows(userSlug, FollowType.followers).then(({ data: follows }) => {
    dispatch(receiveFollowers(follows))
    dispatch(loadedFollows())
  })
}

export const fetchFollowings = (userSlug: string) => (dispatch: GlobalDispatch) => {
  dispatch(loadingFollows())
  FollowsAPIUtil.getFollows(userSlug, FollowType.followings).then(({ data: follow }) => {
    dispatch(receiveFollowings(follow))
    dispatch(loadedFollows())
  })
}

export const createFollow = (userId: number) => (dispatch: GlobalDispatch) => {
  FollowsAPIUtil.postFollow(userId).then(({ data: follow }) => {
    dispatch(receiveFollower(follow))
  })
}

export const deleteFollow = (userId: number) => (dispatch: GlobalDispatch) => {
  FollowsAPIUtil.deleteFollow(userId).then(({ data: follow }) => {
    dispatch(clearFollower(follow))
  })
}

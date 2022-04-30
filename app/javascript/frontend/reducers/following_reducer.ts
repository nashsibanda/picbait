import { FollowAction, FollowActionTypes } from '../actions/follow_actions'
import { Follow } from '../util/types'

const followingReducer = (state: Record<string, Follow> = {}, action: FollowAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FollowActionTypes.RECEIVE_FOLLOWINGS:
      const followsOutput: Record<string, Follow> = {}
      action.follows.forEach(follow => {
        followsOutput[follow.followee] = follow
      })
      return followsOutput
    case FollowActionTypes.RECEIVE_FOLLOWING:
      return Object.assign({}, state, {
        [action.follow.followee]: action.follow,
      })
    case FollowActionTypes.CLEAR_FOLLOWING:
      const shortenedFollows = Object.assign({}, state)
      delete shortenedFollows[action.follow.followee]
      return shortenedFollows
    default:
      return state
  }
}

export default followingReducer

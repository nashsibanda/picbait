import { FollowAction, FollowActionTypes } from '../actions/follow_actions'
import { FollowersState } from '../types/state'

const followingReducer = (state: FollowersState = {}, action: FollowAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FollowActionTypes.RECEIVE_FOLLOWINGS:
      const followsOutput: FollowersState = {}
      action.follows.forEach(follow => {
        followsOutput[follow.followee] = follow
      })
      return followsOutput
    case FollowActionTypes.RECEIVE_FOLLOWING:
      return { ...state, [action.follow.followee]: action.follow }
    case FollowActionTypes.CLEAR_FOLLOWING:
      const shortenedFollows = { ...state }
      delete shortenedFollows[action.follow.followee]
      return shortenedFollows
    default:
      return state
  }
}

export default followingReducer

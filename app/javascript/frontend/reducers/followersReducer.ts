import { FollowAction, FollowActionTypes } from '../actions/followActions'
import { FollowersState } from '../types/state'

const followersReducer = (state: FollowersState = {}, action: FollowAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FollowActionTypes.RECEIVE_FOLLOWERS:
      const followsOutput: FollowersState = {}
      action.follows.forEach(follow => {
        followsOutput[follow.follower] = follow
      })
      return followsOutput
    case FollowActionTypes.RECEIVE_FOLLOWER:
      return { ...state, [action.follow.follower]: action.follow }
    case FollowActionTypes.CLEAR_FOLLOWER:
      const shortenedFollows = { ...state }
      delete shortenedFollows[action.follow.follower]
      return shortenedFollows
    default:
      return state
  }
}

export default followersReducer

import { FollowAction, FollowActionTypes } from '../actions/follow_actions'
import { Follow } from '../util/types'

const followersReducer = (state: Record<string, Follow> = {}, action: FollowAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FollowActionTypes.RECEIVE_FOLLOWERS:
      const followsOutput: Record<string, Follow> = {}
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

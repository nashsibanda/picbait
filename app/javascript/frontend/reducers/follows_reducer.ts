import { CombinedState, combineReducers, Reducer } from 'redux'
import { FollowAction } from '../actions/follow_actions'
import { FollowsState } from '../types/state'
import followersReducer from './followers_reducer'
import followingReducer from './following_reducer'

const followsReducer: Reducer<CombinedState<FollowsState>, FollowAction> = combineReducers({
  followers: followersReducer,
  following: followingReducer,
})

export default followsReducer

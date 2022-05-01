import { CombinedState, combineReducers, Reducer } from 'redux'
import { FollowAction } from '../actions/followActions'
import { FollowsState } from '../types/state'
import followersReducer from './followersReducer'
import followingReducer from './followingReducer'

const followsReducer: Reducer<CombinedState<FollowsState>, FollowAction> = combineReducers({
  followers: followersReducer,
  following: followingReducer,
})

export default followsReducer

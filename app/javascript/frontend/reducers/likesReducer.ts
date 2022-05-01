import { CombinedState, combineReducers, Reducer } from 'redux'
import { GlobalLikesState } from '../types/state'
import commentLikesReducer from './commentLikesReducer'
import postLikesReducer from './postLikesReducer'

const likesReducer: Reducer<CombinedState<GlobalLikesState>> = combineReducers({
  posts: postLikesReducer,
  comments: commentLikesReducer,
})

export default likesReducer

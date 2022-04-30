import { CombinedState, combineReducers, Reducer } from 'redux'
import { GlobalLikesState } from '../types/state'
import commentLikesReducer from './comment_likes_reducer'
import postLikesReducer from './post_likes_reducer'

const likesReducer: Reducer<CombinedState<GlobalLikesState>> = combineReducers({
  posts: postLikesReducer,
  comments: commentLikesReducer,
})

export default likesReducer

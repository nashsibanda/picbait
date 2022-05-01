import { CombinedState, combineReducers, Reducer } from 'redux'
import { PostingAction } from '../actions/postingActions'
import { PostingState } from '../types/state'
import commentPostingReducer from './posting/commentPostingReducer'
import postPostingReducer from './posting/postPostingReducer'
import userPostingReducer from './posting/userPostingReducer'

const postingReducer: Reducer<CombinedState<PostingState>, PostingAction> = combineReducers({
  comments: commentPostingReducer,
  posts: postPostingReducer,
  users: userPostingReducer,
})

export default postingReducer

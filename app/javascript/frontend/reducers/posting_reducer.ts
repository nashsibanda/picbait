import { CombinedState, combineReducers, Reducer } from 'redux'
import { PostingAction } from '../actions/posting_actions'
import { PostingState } from '../types/state'
import commentPostingReducer from './posting/comment_posting_reducer'
import postPostingReducer from './posting/post_posting_reducer'
import userPostingReducer from './posting/user_posting_reducer'

const postingReducer: Reducer<CombinedState<PostingState>, PostingAction> = combineReducers({
  comments: commentPostingReducer,
  posts: postPostingReducer,
  users: userPostingReducer,
})

export default postingReducer

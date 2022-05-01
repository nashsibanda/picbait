import { CombinedState, combineReducers, Reducer } from 'redux'
import { FetchingAction } from '../actions/fetchingActions'
import { LoadingState } from '../types/state'
import commentLoadingReducer from './loading/commentLoadingReducer'
import followLoadingReducer from './loading/followLoadingReducer'
import likeLoadingReducer from './loading/likeLoadingReducer'
import postLoadingReducer from './loading/postLoadingReducer'
import postPageLoadingReducer from './loading/postPageLoadingReducer'
import sessionLoadingReducer from './loading/sessionLoadingReducer'
import userLoadingReducer from './loading/userLoadingReducer'
import usersAutocompleteLoadingReducer from './loading/usersAutocompleteLoadingReducer'

const loadingReducer: Reducer<CombinedState<LoadingState>, FetchingAction> = combineReducers({
  posts: postLoadingReducer,
  users: userLoadingReducer,
  session: sessionLoadingReducer,
  comments: commentLoadingReducer,
  likes: likeLoadingReducer,
  follows: followLoadingReducer,
  postPage: postPageLoadingReducer,
  usersAutocomplete: usersAutocompleteLoadingReducer,
})

export default loadingReducer

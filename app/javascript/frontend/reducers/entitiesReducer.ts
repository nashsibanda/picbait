import { CombinedState, combineReducers, Reducer } from 'redux'
import { EntitiesState } from '../types/state'
import commentsReducer from './commentsReducer'
import followsReducer from './followsReducer'
import likesReducer from './likesReducer'
import postsReducer from './postsReducer'
import usersReducer from './usersReducer'

const entitiesReducer: Reducer<CombinedState<EntitiesState>> = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  follows: followsReducer,
})

export default entitiesReducer

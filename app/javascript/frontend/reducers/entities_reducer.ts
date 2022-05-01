import { CombinedState, combineReducers, Reducer } from 'redux'
import { EntitiesState } from '../types/state'
import commentsReducer from './comments_reducer'
import followsReducer from './follows_reducer'
import likesReducer from './likes_reducer'
import postsReducer from './posts_reducer'
import usersReducer from './users_reducer'

const entitiesReducer: Reducer<CombinedState<EntitiesState>> = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  follows: followsReducer,
})

export default entitiesReducer

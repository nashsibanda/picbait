import { CombinedState, combineReducers, Reducer } from 'redux'
import { GlobalErrorsState } from '../types/state'
import postErrorsReducer from './post_errors_reducer'
import sessionErrorsReducer from './session_errors_reducer'
import userErrorsReducer from './user_errors_reducer'

const errorsReducer: Reducer<CombinedState<GlobalErrorsState>> = combineReducers({
  session: sessionErrorsReducer,
  user: userErrorsReducer,
  post: postErrorsReducer,
})

export default errorsReducer

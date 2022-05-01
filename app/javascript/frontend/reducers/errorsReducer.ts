import { CombinedState, combineReducers, Reducer } from 'redux'
import { GlobalErrorsState } from '../types/state'
import postErrorsReducer from './postErrorsReducer'
import sessionErrorsReducer from './sessionErrorsReducer'
import userErrorsReducer from './userErrorsReducer'

const errorsReducer: Reducer<CombinedState<GlobalErrorsState>> = combineReducers({
  session: sessionErrorsReducer,
  user: userErrorsReducer,
  post: postErrorsReducer,
})

export default errorsReducer

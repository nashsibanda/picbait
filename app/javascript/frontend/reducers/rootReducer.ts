import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { CombinedState, combineReducers, Reducer } from 'redux'
import { GlobalState } from '../types/state'
import entitiesReducer from './entitiesReducer'
import errorsReducer from './errorsReducer'
import sessionReducer from './sessionReducer'
import uiReducer from './uiReducer'

const createRootReducer = (history: History): Reducer<CombinedState<GlobalState>> =>
  combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    router: connectRouter(history),
    ui: uiReducer,
  })

export default createRootReducer

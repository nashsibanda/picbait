import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { CombinedState, combineReducers, Reducer } from 'redux'
import { GlobalState } from '../types/state'
import entitiesReducer from './entities_reducer'
import errorsReducer from './errors_reducer'
import sessionReducer from './session_reducer'
import uiReducer from './ui_reducer'

const createRootReducer = (history: History): Reducer<CombinedState<GlobalState>> =>
  combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    router: connectRouter(history),
    ui: uiReducer,
  })

export default createRootReducer

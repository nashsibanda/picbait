import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import entitiesReducer from './entities_reducer'
import errorsReducer from './errors_reducer'
import postingReducer from './posting_reducer'
import sessionReducer from './session_reducer'
import uiReducer from './ui_reducer'

const createRootReducer = (history: History) =>
  combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    router: connectRouter(history),
    ui: uiReducer,
    posting: postingReducer,
  })

export default createRootReducer

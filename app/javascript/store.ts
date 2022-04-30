import { composeWithDevTools } from '@redux-devtools/extension'
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createRootReducer from './frontend/reducers/root_reducer'
import { GlobalState } from './frontend/types/state'

export const history = createHashHistory()

export default function configureStore(preloadedState = {}): Store<GlobalState> {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, logger))
  )
}

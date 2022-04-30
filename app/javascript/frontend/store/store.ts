import { composeWithDevTools } from '@redux-devtools/extension'
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createRootReducer from '../reducers/root_reducer'

export const history = createHashHistory()

export default function configureStore(preloadedState = {}) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, logger))
  )
}

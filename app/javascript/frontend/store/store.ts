import { createStore, applyMiddleware } from "redux";
import { createHashHistory } from "history";
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from "redux-thunk";
import logger from "redux-logger";
import createRootReducer from "../reducers/root_reducer";
import { routerMiddleware } from "connected-react-router";

export const history = createHashHistory();

export default function configureStore(preloadedState = {}) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), thunk, logger)
    )
  )
}

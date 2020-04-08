import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root_reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

const configureStore = (preloadedState = {}) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

export default configureStore;

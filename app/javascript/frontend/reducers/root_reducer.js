import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import entitiesReducer from "./entities_reducer";
import errorsReducer from "./errors_reducer";
import { connectRouter } from "connected-react-router";
import loadingReducer from "./loading_reducer";
import postingReducer from "./posting_reducer";

const createRootReducer = history =>
  combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    router: connectRouter(history),
    loading: loadingReducer,
    posting: postingReducer,
  });

export default createRootReducer;

import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import entitiesReducer from "./entities_reducer";
import errorsReducer from "./errors_reducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = history =>
  combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    router: connectRouter(history),
  });

export default createRootReducer;

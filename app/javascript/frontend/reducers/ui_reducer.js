import { combineReducers } from "redux";
import loadingReducer from "./loading_reducer";
import autocompleteReducer from "./autocomplete_reducer";

const uiReducer = combineReducers({
  loading: loadingReducer,
  autocomplete: autocompleteReducer,
});

export default uiReducer;

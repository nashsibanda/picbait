import { combineReducers } from "redux";
import usersAutocompleteReducer from "./autocomplete/users_autocomplete_reducer";

const autocompleteReducer = combineReducers({
  users: usersAutocompleteReducer,
});

export default autocompleteReducer;

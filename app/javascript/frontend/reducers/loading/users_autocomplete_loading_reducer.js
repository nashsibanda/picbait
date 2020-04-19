import {
  LOADING_USERS_AUTOCOMPLETE,
  LOADED_USERS_AUTOCOMPLETE,
} from "../../actions/fetching_actions";

const usersAutocompleteLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_USERS_AUTOCOMPLETE:
      return true;
    case LOADED_USERS_AUTOCOMPLETE:
      return false;
    default:
      return state;
  }
};

export default usersAutocompleteLoadingReducer;

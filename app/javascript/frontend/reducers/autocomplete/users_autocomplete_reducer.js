import { RECEIVE_USERS_AUTOCOMPLETE } from "../../actions/autocomplete_actions";

const usersAutocompleteReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS_AUTOCOMPLETE:
      const outputAutocomplete = {};
      action.users.forEach(user => {
        outputAutocomplete[user[0]] = user;
      });
      return outputAutocomplete;
    default:
      return state;
  }
};

export default usersAutocompleteReducer;

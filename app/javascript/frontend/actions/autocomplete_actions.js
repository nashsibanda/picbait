import { getUsersAutocomplete } from "../util/users_api_util";
import {
  loadingUsersAutocomplete,
  loadedUsersAutocomplete,
} from "./fetching_actions";

export const RECEIVE_USERS_AUTOCOMPLETE = "RECEIVE_USERS_AUTOCOMPLETE";

const receiveUsersAutocomplete = users => ({
  type: RECEIVE_USERS_AUTOCOMPLETE,
  users,
});

export const fetchUsersAutocomplete = () => dispatch => {
  dispatch(loadingUsersAutocomplete());
  getUsersAutocomplete().then(users => {
    dispatch(receiveUsersAutocomplete(users));
    dispatch(loadedUsersAutocomplete());
  });
};

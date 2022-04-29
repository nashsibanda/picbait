import { LOADING_USERS, LOADED_USERS } from "../../actions/fetching_actions";

const userLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_USERS:
      return true;
    case LOADED_USERS:
      return false;
    default:
      return state;
  }
};

export default userLoadingReducer;

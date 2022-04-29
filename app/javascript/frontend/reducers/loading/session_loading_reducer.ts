import {
  LOADING_SESSION,
  LOADED_SESSION,
} from "../../actions/fetching_actions";

const sessionLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_SESSION:
      return true;
    case LOADED_SESSION:
      return false;
    default:
      return state;
  }
};

export default sessionLoadingReducer;

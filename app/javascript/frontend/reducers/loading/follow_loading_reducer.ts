import {
  LOADING_FOLLOWS,
  LOADED_FOLLOWS,
} from "../../actions/fetching_actions";

const followLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_FOLLOWS:
      return true;
    case LOADED_FOLLOWS:
      return false;
    default:
      return state;
  }
};

export default followLoadingReducer;

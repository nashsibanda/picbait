import {
  LOADING_COMMENTS,
  LOADED_COMMENTS,
} from "../../actions/fetching_actions";

const commentLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_COMMENTS:
      return true;
    case LOADED_COMMENTS:
      return false;
    default:
      return state;
  }
};

export default commentLoadingReducer;

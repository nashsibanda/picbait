import {
  POSTING_COMMENTS,
  POSTED_COMMENTS,
} from "../../actions/posting_actions";

const commentPostingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case POSTING_COMMENTS:
      return true;
    case POSTED_COMMENTS:
      return false;
    default:
      return state;
  }
};

export default commentPostingReducer;

import { POSTING_USERS, POSTED_USERS } from "../../actions/posting_actions";

const userPostingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case POSTING_USERS:
      return true;
    case POSTED_USERS:
      return false;
    default:
      return state;
  }
};

export default userPostingReducer;

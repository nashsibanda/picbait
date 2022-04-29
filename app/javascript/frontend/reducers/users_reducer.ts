import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.slug]: action.currentUser,
      });
    case RECEIVE_USERS:
      const usersOutput = {};
      action.users.forEach(user => {
        usersOutput[user.slug] = user;
      });
      return usersOutput;
    case RECEIVE_USER:
      return Object.assign({}, state, {
        [action.user.slug]: action.user,
      });
    default:
      return state;
  }
};

export default usersReducer;

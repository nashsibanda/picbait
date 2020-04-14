import { updateUser } from "../../actions/user_actions";
import { connect } from "react-redux";
import ProfileUserInfo from "./profile_user_info";
import { createFollow, deleteFollow } from "../../actions/follow_actions";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  followers: state.entities.follows.followers,
  following: state.entities.follows.following,
  followStatus: state.entities.follows.followers[state.session.currentUser.slug]
    ? true
    : false,
});

const mapDispatchToProps = dispatch => ({
  updateUser: (id, formUser) => dispatch(updateUser(id, formUser)),
  createFollow: userId => dispatch(createFollow(userId)),
  deleteFollow: userId => dispatch(deleteFollow(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserInfo);

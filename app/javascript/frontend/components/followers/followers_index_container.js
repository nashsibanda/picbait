import { fetchUsers } from "../../actions/user_actions";
import { connect } from "react-redux";
import FollowersIndex from "./followers_index";

const mapStateToProps = state => ({
  users: state.entities.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: filters => dispatch(fetchUsers(filters)),
});

export default connect(null, mapDispatchToProps)(FollowersIndex);

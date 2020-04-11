import { updateUser } from "../../actions/user_actions";
import { connect } from "react-redux";
import ProfileUserInfo from "./profile_user_info";

const mapDispatchToProps = dispatch => ({
  updateUser: (id, formUser) => dispatch(updateUser(id, formUser)),
});

export default connect(null, mapDispatchToProps)(ProfileUserInfo);

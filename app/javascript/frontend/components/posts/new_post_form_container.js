import { createPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostForm from "./post_form";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  formType: "new",
});

const mapDispatchToProps = dispatch => ({
  processForm: formPost => dispatch(createPost(formPost)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

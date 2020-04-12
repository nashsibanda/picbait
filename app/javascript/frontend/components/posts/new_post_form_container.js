import { createPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostForm from "./post_form";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  formType: "new",
  errors: state.errors.post,
});

const mapDispatchToProps = dispatch => ({
  processForm: (formPost, userSlug) => dispatch(createPost(formPost, userSlug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

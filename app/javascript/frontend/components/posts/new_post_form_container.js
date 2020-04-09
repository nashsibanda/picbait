import { createPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostForm from "./post_form";

const mapStateToProps = state => ({
  userId: state.session.id,
  formType: "new",
});

const mapDispatchToProps = dispatch => ({
  processForm: formPost => dispatch(createPost(formPost)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

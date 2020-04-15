import { fetchPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostModal from "./posts_modal";

const mapStateToProps = state => {
  return {
    posts: state.entities.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

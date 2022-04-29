import { fetchPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostModal from "./posts_modal";

const mapStateToProps = state => {
  return {
    posts: state.entities.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPost: (id, shouldFetchPost) => dispatch(fetchPost(id, shouldFetchPost)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

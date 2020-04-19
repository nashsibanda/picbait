import { connect } from "react-redux";
import CommentsIndexItem from "./comments_index_item";
import {
  createCommentLike,
  deleteCommentLike,
} from "../../actions/like_actions";
import { getUsersAutocomplete } from "../../util/users_api_util";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.comment;
  return {
    likes: state.entities.likes.comments[id],
    currentUser: state.session.currentUser,
    usersAutocomplete: state.ui.autocomplete.users,
    loadingUsersAutocomplete: state.ui.loading.usersAutocomplete,
  };
};

const mapDispatchToProps = dispatch => ({
  createCommentLike: commentId => dispatch(createCommentLike(commentId)),
  deleteCommentLike: id => dispatch(deleteCommentLike(id)),
  fetchUsernameAutocomplete: () => getUsersAutocomplete(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndexItem);

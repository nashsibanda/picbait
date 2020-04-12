import { connect } from "react-redux";
import PostInfo from "./post_info";

const mapStateToProps = (state, ownProps) => ({
  author: state.entities.users[ownProps.authorSlug],
  comments: state.entities.comments,
});

export default connect(mapStateToProps, null)(PostInfo);

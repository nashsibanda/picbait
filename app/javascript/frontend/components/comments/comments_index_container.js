import { connect } from "react-redux";
import CommentsIndex from "./comments_index";

const mapStateToProps = state => ({
  users: state.entities.users,
});

export default connect(mapStateToProps, null)(CommentsIndex);

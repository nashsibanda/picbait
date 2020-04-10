import { connect } from "react-redux";
import Feed from "./feed";

const mapStateToProps = state => {
  return {
    posts: state.entities.posts,
  };
};

export default connect(mapStateToProps, null)(Feed);

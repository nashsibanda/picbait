import React from "react";
import PostInfoContainer from "./post_info_container";
import { LoadingSpinner } from "../ui/loading_spinner";

class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.loadPageData = this.loadPageData.bind(this);
    this.preventClickPropagation = this.preventClickPropagation.bind(this);
  }

  loadPageData() {
    const { fetchPost, postId, posts } = this.props;
    fetchPost(postId, !posts[postId]);
  }

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.postId != prevProps.postId) {
      this.loadPageData();
    }
  }

  preventClickPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const { posts, postId, closeModal } = this.props;
    const post = posts[postId];
    if (!post) {
      return null;
    }
    return (
      <div className="post-display-modal" onClick={closeModal}>
        <div
          className="post-modal-container"
          onClick={this.preventClickPropagation}
        >
          {post ? <PostInfoContainer post={post} /> : <LoadingSpinner />}
          <button
            type="button"
            onClick={closeModal}
            className="post-modal-close"
          >
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default PostModal;

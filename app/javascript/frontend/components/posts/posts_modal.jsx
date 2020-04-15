import React from "react";
import PostInfoContainer from "./post_info_container";

class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.loadPageData = this.loadPageData.bind(this);
  }

  loadPageData() {
    const { fetchPost, postId } = this.props;
    fetchPost(postId);
  }

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.postId != prevProps.postId) {
      this.loadPageData();
    }
  }

  render() {
    const { posts, postId, closeModal } = this.props;
    const post = posts[postId];
    if (!post) {
      return <h2>waiting</h2>;
    }
    return (
      <div className="post-display-modal" onClick={closeModal}>
        <div className="post-modal-container">
          <PostInfoContainer post={post} />
        </div>
      </div>
    );
  }
}

export default PostModal;

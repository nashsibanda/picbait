import React from "react";
import PostInfo from "./post_info";
import PostInfoContainer from "./post_info_container";

class PostShow extends React.Component {
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
    const { posts, postId } = this.props;
    const post = posts[postId];
    return (
      <div className="post-show-container">
        {post && <PostInfoContainer post={post} authorSlug={post.authorSlug} />}
      </div>
    );
  }
}

export default PostShow;

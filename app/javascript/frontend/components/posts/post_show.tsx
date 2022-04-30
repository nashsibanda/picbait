import React from "react";
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
    console.log("🚀 ~ file: post_show.tsx ~ line 17 ~ PostShow ~ componentDidMount ~ loadPageData", 'LOOOOK')
    const { posts, postId, loading } = this.props;
    const post = posts[postId];
    return (
      <div className="post-show-container">
        {post && <PostInfoContainer post={post} />}
      </div>
    );
  }
}

export default PostShow;

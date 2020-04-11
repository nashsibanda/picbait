import React from "react";
import PostInfo from "./post_info";

class PostShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchPost, postId } = this.props;
    fetchPost(postId);
  }

  render() {
    const { posts, postId } = this.props;
    const post = posts[postId];
    return (
      <div className="post-show-container">
        {post && <PostInfo post={post} />}
      </div>
    );

    // if (post) {
    //   const { id, title, description, date, author_id, imageUrl } = post;
    //   console.log(post);
    //   return <h1>Post Show here!</h1>;
    // } else {
    //   return null;
    // }
    return null;
  }
}

export default PostShow;

import React from "react";
import PostsIndexItemContainer from "./posts_index_item_container";
import PostsModalContainer from "./posts_modal_container";
import { withRouter } from "react-router-dom";

class PostsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPost: null,
    };
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  displayModal(postId) {
    return e => this.setState({ modalPost: parseInt(postId) });
  }

  closeModal(e) {
    e.stopPropagation();
    this.setState({ modalPost: null }, this.props.modalClosed);
  }

  render() {
    const { posts, likes, postIds } = this.props;
    const { modalPost } = this.state;
    if (!posts) {
      return <h1>NO POSTS :(</h1>;
    }
    const postKeys = Object.keys(posts).sort((a, b) => b - a);
    return (
      <div className="posts-index-container">
        <ul className="posts-index">
          {postKeys.map(postId => {
            const post = posts[postId];
            return (
              <PostsIndexItemContainer
                post={post}
                postId={postId}
                key={postId}
                likes={likes[postId]}
                updateModal={this.displayModal}
              />
            );
          })}
        </ul>
        {modalPost && (
          <PostsModalContainer
            postId={modalPost}
            closeModal={this.closeModal}
            postIds={postIds}
          />
        )}
      </div>
    );
  }
}

export default withRouter(PostsIndex);

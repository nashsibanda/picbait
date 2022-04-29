import React from "react";
import PostsIndexItemContainer from "./posts_index_item_container";
import PostsModalContainer from "./posts_modal_container";
import { withRouter } from "react-router-dom";

class PostsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPost: null,
      order: [],
    };
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.reorder = this.reorder.bind(this);
  }

  componentDidMount() {
    this.reorder();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts != prevProps.posts) {
      this.reorder();
    }
  }

  reorder() {
    const postsOrder = Object.values(this.props.posts).sort(
      (a, b) => b.creationNum - a.creationNum
    );
    this.setState({
      order: postsOrder.map(post => post.id),
    });
  }

  displayModal(postId) {
    return e => this.setState({ modalPost: parseInt(postId) });
  }

  closeModal(e) {
    e.stopPropagation();
    this.setState({ modalPost: null });
  }

  render() {
    const { posts, likes, type } = this.props;
    const { modalPost, order } = this.state;
    if (!posts) {
      return <h1>NO POSTS :(</h1>;
    }

    return (
      <div className="posts-index-container">
        <ul className="posts-index">
          {order.map(postId => {
            const post = posts[postId];
            return (
              post && (
                <PostsIndexItemContainer
                  post={post}
                  postId={postId}
                  key={postId}
                  likes={likes}
                  type={type}
                  updateModal={this.displayModal}
                />
              )
            );
          })}
        </ul>
        {modalPost && (
          <PostsModalContainer
            postId={modalPost}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default withRouter(PostsIndex);

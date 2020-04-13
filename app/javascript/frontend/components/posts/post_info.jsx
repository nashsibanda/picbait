import React from "react";
import { PostAuthor } from "./post_author";
import CommentsIndexContainer from "./../comments/comments_index_container";

class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fillImage: true,
      liked: this.props.likes[this.props.currentUser.id] ? true : false,
      likesCount: Object.keys(this.props.likes).length,
    };
    this.toggleFillImage = this.toggleFillImage.bind(this);
    this.toggleLiked = this.toggleLiked.bind(this);
  }

  toggleFillImage(e) {
    this.setState({ fillImage: !this.state.fillImage });
  }

  toggleLiked(e) {
    const { liked, likesCount } = this.state;
    const {
      createPostLike,
      deletePostLike,
      likes,
      currentUser,
      postId,
    } = this.props;
    if (liked) {
      const likeId = likes[currentUser.id].id;
      deletePostLike(likeId);
      this.setState({ liked: false, likesCount: likesCount - 1 });
    } else {
      createPostLike(postId);
      this.setState({ liked: true, likesCount: likesCount + 1 });
    }
  }

  render() {
    const { post, comments, likes } = this.props;
    const { fillImage, liked, likesCount } = this.state;
    const author = this.props.author;
    const { id, title, description, date, imageUrl } = post;
    return (
      <div className="post-info">
        <section className="image">
          <img
            src={imageUrl}
            className={fillImage ? "fill-image" : "fit-image"}
            onClick={this.toggleFillImage}
          ></img>
          <div className="expand">
            <i
              className={`fas ${
                fillImage ? "fa-compress-alt" : "fa-expand-alt"
              }`}
              onClick={this.toggleFillImage}
            ></i>
          </div>
        </section>
        <section className="details">
          <div className="author-details">
            {author && <PostAuthor author={author} />}
          </div>
          <div className="comments">
            {comments ? (
              <CommentsIndexContainer comments={comments} nested={false} />
            ) : (
              <p>No Comments :(</p>
            )}
          </div>
          <div className="interactions">
            <button
              type="button"
              onClick={this.toggleLiked}
              className="likes-button"
            >
              <i className={`fas fa-heart ${liked ? "liked" : "unliked"}`}></i>
              {`liked by ${likesCount > 0 ? likesCount : "no"} ${
                likesCount == 1 ? "user" : "users"
              }`}
            </button>
          </div>
          <div className="comment-form">New Comment</div>
        </section>
      </div>
    );
  }
}

export default PostInfo;

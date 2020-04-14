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
      body: "",
      parentCommentId: null,
      parentCommenter: null,
    };
    this.toggleFillImage = this.toggleFillImage.bind(this);
    this.toggleLiked = this.toggleLiked.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateParentComment = this.updateParentComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.setCommentInputFocus = this.setCommentInputFocus.bind(this);
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  updateParentComment(id, commenter) {
    this.setState({ parentCommentId: id, parentCommenter: commenter });
  }

  submitComment(e) {
    e.preventDefault();
    e.stopPropagation();
    const formComment = new FormData();
    const { body, parentCommentId } = this.state;
    const { postId, currentUser, createComment } = this.props;
    formComment.append("comment[body]", body);
    if (parentCommentId) {
      formComment.append("comment[parent_comment_id]", parentCommentId);
    }
    formComment.append("comment[api_post_id]", postId);
    formComment.append("comment[api_user_id]", currentUser.id);
    createComment(formComment);
    this.setState({ body: "", parentCommentId: null, parentCommenter: null });
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

  setCommentInputFocus() {
    this.commentInput.focus();
  }

  render() {
    const { post, comments } = this.props;
    const { fillImage, liked, likesCount, body, parentCommenter } = this.state;
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
              <CommentsIndexContainer
                comments={comments}
                nested={false}
                parentId={null}
                updateParent={this.updateParentComment}
              />
            ) : (
              <p>No Comments :(</p>
            )}
          </div>
          <div className="interactions">
            <button
              type="button"
              onClick={this.setCommentInputFocus}
              className="likes-button index"
            >
              <i className="fas fa-comment-alt"></i>
              {`${
                Object.keys(comments).length > 0
                  ? Object.keys(comments).length
                  : "no"
              } ${Object.keys(comments).length == 1 ? "comment" : "comments"}`}
            </button>
            <button
              type="button"
              onClick={this.toggleLiked}
              className="likes-button index"
            >
              <i className={`fas fa-heart ${liked ? "liked" : "unliked"}`}></i>
              {`liked by ${likesCount > 0 ? likesCount : "no"} ${
                likesCount == 1 ? "user" : "users"
              }`}
            </button>
          </div>
          <form className="comment-form" onSubmit={this.submitComment}>
            <div
              className={`replying-banner ${parentCommenter ? "" : "hidden"}`}
            >
              replying to {parentCommenter}
            </div>
            <textarea
              placeholder="Add a comment..."
              value={body}
              onChange={this.updateBody}
              ref={input => {
                this.commentInput = input;
              }}
            ></textarea>
            <button type="submit">Post</button>
          </form>
        </section>
      </div>
    );
  }
}

export default PostInfo;

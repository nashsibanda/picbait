import React from "react";
import { PostAuthor } from "./post_author";

class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fillImage: true,
    };
    this.toggleFillImage = this.toggleFillImage.bind(this);
  }

  toggleFillImage(e) {
    this.setState({ fillImage: !this.state.fillImage });
  }

  render() {
    const { post } = this.props;
    const { fillImage } = this.state;
    const { id, title, description, date, author_id, imageUrl, author } = post;
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
            <p>Comments</p>
          </div>
          <div className="interactions">Interactions (likes, etc.)</div>
          <div className="comment-form">New Comment</div>
        </section>
      </div>
    );
  }
}

export default PostInfo;

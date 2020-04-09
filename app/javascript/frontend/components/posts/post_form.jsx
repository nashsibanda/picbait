import React from "react";
import { makeFilename, capitalize } from "../../util/misc_util";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imageFile: null,
      imageUrl: "",
    };
    this.handleImage = this.handleImage.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToFeed = this.redirectToFeed.bind(this);
  }

  handleImage(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  updateProperty(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formPost = new FormData();
    const { title, description, imageFile } = this.state;
    formPost.append("post[title]", title);
    formPost.append("post[description]", description);
    formPost.append("post[image]", imageFile, makeFilename(imageFile.name));
    formPost.append("post[api_user_id]", this.props.userId);
    this.props.processForm(formPost);
    this.redirectToFeed();
  }

  redirectToFeed() {
    this.props.history.push(`/users/${this.props.userId}`);
  }

  render() {
    const { formType } = this.props;
    const { title, description, imageUrl } = this.state;
    console.log(formType);
    return (
      <div className="post-form-container">
        <form
          className={`post-form ${formType}-post-form`}
          onSubmit={this.handleSubmit}
        >
          <div>
            <h2>{capitalize(formType)} Post</h2>
          </div>
          <div>
            <label htmlFor="post-form-image">Image</label>
            <input
              type="file"
              id="post-form-image"
              onChange={this.handleImage}
              required={true}
            ></input>
          </div>
          {imageUrl && (
            <div>
              <img src={imageUrl}></img>
            </div>
          )}
          <div>
            <label htmlFor="post-form-title">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              id="post-form-title"
              onChange={this.updateProperty("title")}
              required={true}
            ></input>
          </div>
          <div>
            <label htmlFor="post-form-description">
              Description (optional)
            </label>
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              id="post-form-description"
              onChange={this.updateProperty("description")}
            ></input>
          </div>
          <div>
            <button type="submit" className="form-submit-button">
              Add Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;

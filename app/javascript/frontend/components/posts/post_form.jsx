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
    formPost.append("post[api_user_id]", this.props.currentUser.id);
    const userSlug = this.props.currentUser.slug;
    this.props.processForm(formPost, userSlug);
  }

  render() {
    const { formType, errors } = this.props;
    const { title, description, imageUrl } = this.state;
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
            <input
              type="file"
              id="post-form-image"
              onChange={this.handleImage}
              required={true}
            ></input>
            <label htmlFor="post-form-image" className="file-input-label">
              {imageUrl ? "Select a Different Image..." : "Upload Image..."}
            </label>
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
          {errors.length > 0 && (
            <ul className="session-errors">
              {errors.map(error => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          )}
        </form>
      </div>
    );
  }
}

export default PostForm;

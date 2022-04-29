import React from "react";
import { capitalize, sanitizeContent } from "../../util/misc_util";
import { CircularProgressbar } from "react-circular-progressbar";
import { LoadingSpinner } from "../ui/loading_spinner";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imageFile: null,
      imageUrl: "",
      titleIndicator: false,
      descriptionIndicator: false,
      displayImageEl: null,
      loadingImage: false,
    };
    this.handleImage = this.handleImage.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleIndicator = this.toggleIndicator.bind(this);
    this.displayImage = this.displayImage.bind(this);
  }

  toggleIndicator(indicator) {
    return e => this.setState({ [indicator]: !this.state[indicator] });
  }

  displayImage() {
    loadImage(
      this.state.imageUrl,
      img => {
        this.setState({ displayImageEl: img }, () => {
          this.setState({ loadingImage: false }, () => {
            if (this.state.displayImageEl instanceof Element) {
              this.preview.appendChild(this.state.displayImageEl);
            } else {
              alert("This is not a valid image file format!");
            }
          });
        });
      },
      { orientation: true }
    );
  }

  handleImage(e) {
    this.setState({ loadingImage: true, displayImageEl: null });
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () =>
      this.setState(
        { imageUrl: reader.result, imageFile: file },
        this.displayImage
      );

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null, displayImageEl: null });
    }
  }

  updateProperty(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formPost = new FormData();
    const { title, description, imageFile } = this.state;
    formPost.append("post[title]", sanitizeContent(title));
    formPost.append("post[description]", sanitizeContent(description));
    formPost.append("post[image]", imageFile);
    formPost.append("post[api_user_id]", this.props.currentUser.id);
    const userSlug = this.props.currentUser.slug;
    this.props.processForm(formPost, userSlug);
  }

  render() {
    const { formType, errors, posting } = this.props;
    const {
      title,
      description,
      imageUrl,
      titleIndicator,
      descriptionIndicator,
      displayImageEl,
      loadingImage,
    } = this.state;
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
              <button type="button">
                <i className="fas fa-upload"></i>
                <span className="button-text">
                  {imageUrl ? "Select a Different Image..." : "Upload Image..."}
                </span>
              </button>
            </label>
          </div>
          {loadingImage && <LoadingSpinner />}
          {displayImageEl && <div ref={ref => (this.preview = ref)}></div>}

          <div>
            <label htmlFor="post-form-title">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              id="post-form-title"
              maxLength="200"
              onChange={this.updateProperty("title")}
              onFocus={this.toggleIndicator("titleIndicator")}
              onBlur={this.toggleIndicator("titleIndicator")}
              required={true}
            ></input>
            {titleIndicator && (
              <CircularProgressbar value={title.length} maxValue={200} />
            )}
          </div>
          <div>
            <label htmlFor="post-form-description">
              Description (optional)
            </label>
            <textarea
              type="text"
              placeholder="Description (optional)"
              value={description}
              id="post-form-description"
              maxLength="200"
              onChange={this.updateProperty("description")}
              onFocus={this.toggleIndicator("descriptionIndicator")}
              onBlur={this.toggleIndicator("descriptionIndicator")}
            />
            {descriptionIndicator && (
              <CircularProgressbar value={description.length} maxValue={200} />
            )}
          </div>
          <div>
            {posting.posts ? (
              <LoadingSpinner />
            ) : (
              <button type="submit" className="form-submit-button">
                Add Post
              </button>
            )}
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

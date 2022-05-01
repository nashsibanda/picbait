import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { capitalize, sanitizeContent } from '../../util/misc_util'
import LoadingSpinner from '../ui/loading_spinner'
import { PostFormProps } from './new_post_form_container'

type PostFormState = {
  title: string
  description: string
  imageFile: File | null
  imageUrl: string | ArrayBuffer | null
  titleIndicator: boolean
  descriptionIndicator: boolean
  displayImageEl: Element | null
  loadingImage: boolean
}

class PostForm extends React.Component<PostFormProps, PostFormState> {
  preview: HTMLDivElement | null

  constructor(props: PostFormProps) {
    super(props)
    this.state = {
      title: '',
      description: '',
      imageFile: null,
      imageUrl: '',
      titleIndicator: false,
      descriptionIndicator: false,
      displayImageEl: null,
      loadingImage: false,
    }
    this.handleImage = this.handleImage.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleIndicator = this.toggleIndicator.bind(this)
    this.displayImage = this.displayImage.bind(this)
    this.preview = null
  }

  handleImage(e: SyntheticEvent) {
    this.setState({ loadingImage: true, displayImageEl: null })
    const reader = new FileReader()
    const target = e.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file }, this.displayImage)

    if (file) {
      reader.readAsDataURL(file)
    } else {
      this.setState({ imageUrl: '', imageFile: null, displayImageEl: null })
    }
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault()
    const formPost = new FormData()
    const { currentUser, processForm } = this.props
    const { title, description, imageFile } = this.state
    formPost.append('post[title]', sanitizeContent(title))
    formPost.append('post[description]', sanitizeContent(description))
    formPost.append('post[image]', imageFile as File)
    formPost.append('post[api_user_id]', currentUser.id.toString())
    const userSlug = currentUser.slug
    processForm(formPost, userSlug)
  }

  displayImage() {
    const { imageUrl, displayImageEl } = this.state
    // @ts-expect-error
    loadImage(
      imageUrl,
      (img: Element) => {
        this.setState({ displayImageEl: img }, () => {
          this.setState({ loadingImage: false }, () => {
            if (displayImageEl instanceof Element && this.preview) {
              this.preview.appendChild(displayImageEl)
            } else {
              // eslint-disable-next-line no-alert
              alert('This is not a valid image file format!')
            }
          })
        })
      },
      { orientation: true }
    )
  }

  updateProperty(property: keyof Pick<PostFormState, 'title' | 'description'>) {
    return (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>
      this.setState(prevState => ({ ...prevState, [property]: e.target.value }))
  }

  toggleIndicator(indicator: keyof Pick<PostFormState, 'descriptionIndicator' | 'titleIndicator'>) {
    const { [indicator]: currentValue } = this.state
    return () => this.setState(prevState => ({ ...prevState, [indicator]: !currentValue }))
  }

  render() {
    const { formType, errors, posting } = this.props
    const { title, description, imageUrl, titleIndicator, descriptionIndicator, displayImageEl, loadingImage } =
      this.state
    return (
      <div className='post-form-container'>
        <form className={`post-form ${formType}-post-form`} onSubmit={this.handleSubmit}>
          <div>
            <h2>{capitalize(formType)} Post</h2>
          </div>
          <div>
            <input type='file' id='post-form-image' onChange={this.handleImage} required />
            <label htmlFor='post-form-image' className='file-input-label'>
              <button type='button'>
                <i className='fas fa-upload' />
                <span className='button-text'>{imageUrl ? 'Select a Different Image...' : 'Upload Image...'}</span>
              </button>
            </label>
          </div>
          {loadingImage && <LoadingSpinner />}
          {displayImageEl && (
            <div
              ref={ref => {
                this.preview = ref
              }}
            />
          )}

          <div>
            <label htmlFor='post-form-title'>Title</label>
            <input
              type='text'
              placeholder='Title'
              value={title}
              id='post-form-title'
              maxLength={200}
              onChange={this.updateProperty('title')}
              onFocus={this.toggleIndicator('titleIndicator')}
              onBlur={this.toggleIndicator('titleIndicator')}
              required
            />
            {titleIndicator && <CircularProgressbar value={title.length} maxValue={200} />}
          </div>
          <div>
            <label htmlFor='post-form-description'>Description (optional)</label>
            <textarea
              placeholder='Description (optional)'
              value={description}
              id='post-form-description'
              maxLength={200}
              onChange={this.updateProperty('description')}
              onFocus={this.toggleIndicator('descriptionIndicator')}
              onBlur={this.toggleIndicator('descriptionIndicator')}
            />
            {descriptionIndicator && <CircularProgressbar value={description.length} maxValue={200} />}
          </div>
          <div>
            {posting.posts ? (
              <LoadingSpinner />
            ) : (
              <button type='submit' className='form-submit-button'>
                Add Post
              </button>
            )}
          </div>
          {errors.length > 0 && (
            <ul className='session-errors'>
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    )
  }
}

export default PostForm

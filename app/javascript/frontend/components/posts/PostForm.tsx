import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import { capitalize, sanitizeContent } from '../../util/miscUtil'
import LoadingSpinner from '../ui/LoadingSpinner'

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
  }

  handleImage(e: SyntheticEvent) {
    this.setState({ loadingImage: true, displayImageEl: null })
    const reader = new FileReader()
    const target = e.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file })

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
    const { title, description, imageUrl, titleIndicator, descriptionIndicator } = this.state
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
          {imageUrl && <LazyLoadImage src={imageUrl as string} placeholder={<LoadingSpinner />} />}
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

const mapStateToProps = (state: AuthenticatedGlobalState) => ({
  currentUser: state.session.currentUser,
  formType: 'new',
  errors: state.errors.post,
  posting: state.ui.posting,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  processForm: (formPost: FormData, userSlug: string) => dispatch(createPost(formPost, userSlug)),
})

export type PostFormProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)

import React, { SyntheticEvent } from 'react'
import LoadingSpinner from '../ui/loading_spinner'
import type { PostModalProps } from './posts_modal_container'
import PostInfoContainer from './post_info_container'

class PostModal extends React.Component<PostModalProps> {
  constructor(props: PostModalProps) {
    super(props)
    this.loadPageData = this.loadPageData.bind(this)
  }

  componentDidMount() {
    this.loadPageData()
  }

  componentDidUpdate(prevProps: PostModalProps) {
    const { postId } = this.props
    if (postId !== prevProps.postId) this.loadPageData()
  }

  loadPageData() {
    const { fetchPost, postId, posts } = this.props
    fetchPost(postId, !posts[postId])
  }

  render() {
    const { posts, postId, closeModal } = this.props
    const post = posts[postId]
    if (!post) {
      return null
    }
    return (
      <div className='post-display-modal' onClick={closeModal}>
        <div className='post-modal-container' onClick={(e: SyntheticEvent) => e.stopPropagation()} role='presentation'>
          {post ? <PostInfoContainer post={post} /> : <LoadingSpinner />}
          <button type='button' onClick={closeModal} className='post-modal-close'>
            <i className='fas fa-times-circle' />
          </button>
        </div>
      </div>
    )
  }
}

export default PostModal

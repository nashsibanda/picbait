import React, { MouseEventHandler, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { fetchPost as fetchPostAction } from '../../actions/postActions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import LoadingSpinner from '../ui/LoadingSpinner'
import PostInfo from './PostInfo'

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
          {post ? <PostInfo post={post} /> : <LoadingSpinner />}
          <button type='button' onClick={closeModal} className='post-modal-close'>
            <i className='fas fa-times-circle' />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  posts: state.entities.posts,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchPost: (id: number, shouldFetchPost: boolean) => dispatch(fetchPostAction(id, shouldFetchPost)),
})

export type PostModalProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> & {
  postId: number
  closeModal: MouseEventHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)

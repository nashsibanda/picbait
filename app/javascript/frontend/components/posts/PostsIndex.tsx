import React, { MouseEventHandler, SyntheticEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { PostsIndexType } from '../../types/entities'
import { LikesState, PostsState } from '../../types/state'
import PostsIndexItem from './PostsIndexItem'
import PostsModal from './PostsModal'

type PostsIndexProps = RouteComponentProps & {
  posts: PostsState
  likes: LikesState
  type: PostsIndexType
}

type PostsIndexState = {
  modalPost: number | null
  order: number[]
}

class PostsIndex extends React.Component<PostsIndexProps, PostsIndexState> {
  constructor(props: PostsIndexProps) {
    super(props)
    this.state = {
      modalPost: null,
      order: [],
    }
    this.displayModal = this.displayModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.reorder = this.reorder.bind(this)
  }

  componentDidMount() {
    this.reorder()
  }

  componentDidUpdate(prevProps: PostsIndexProps) {
    const { posts } = this.props
    if (posts !== prevProps.posts) {
      this.reorder()
    }
  }

  reorder() {
    const { posts } = this.props
    const postsOrder = Object.values(posts).sort((a, b) => b.creationNum - a.creationNum)
    this.setState({
      order: postsOrder.map(post => post.id),
    })
  }

  displayModal(postId: number): MouseEventHandler {
    return () => this.setState({ modalPost: postId })
  }

  closeModal(e: SyntheticEvent) {
    e.stopPropagation()
    this.setState({ modalPost: null })
  }

  render() {
    const { posts, likes, type } = this.props
    const { modalPost, order } = this.state
    if (!posts) {
      return <h1>NO POSTS :(</h1>
    }

    return (
      <div className='posts-index-container'>
        <ul className='posts-index'>
          {order.map(postId => {
            const post = posts[postId]
            return (
              post && (
                <PostsIndexItem
                  post={post}
                  postId={postId}
                  key={postId}
                  likes={likes}
                  postsIndexType={type}
                  updateModal={this.displayModal}
                />
              )
            )
          })}
        </ul>
        {modalPost && <PostsModal postId={modalPost} closeModal={this.closeModal} />}
      </div>
    )
  }
}

export default withRouter(PostsIndex)

import React, { SyntheticEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { LikesState, PostsState } from '../../types/state'
import PostsIndexItemContainer from './posts_index_item_container'
import PostsModalContainer from './posts_modal_container'

type PostsIndexProps = RouteComponentProps & {
  posts: PostsState
  likes: LikesState
  type: 'feed' | 'profile'
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

  displayModal(postId: string) {
    return () => this.setState({ modalPost: parseInt(postId, 10) })
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
                <PostsIndexItemContainer
                  post={post}
                  postId={postId}
                  key={postId}
                  likes={likes}
                  type={type}
                  updateModal={this.displayModal}
                />
              )
            )
          })}
        </ul>
        {modalPost && <PostsModalContainer postId={modalPost} closeModal={this.closeModal} />}
      </div>
    )
  }
}

export default withRouter(PostsIndex)

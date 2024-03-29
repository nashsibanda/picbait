import React from 'react'
import { connect } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import { clearPosts as clearPostsAction, fetchFeedPosts as fetchFeedPostsAction } from '../../actions/postActions'
import { PostsIndexType } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import PostsIndex from '../posts/PostsIndex'
import LoadingSpinner from '../ui/LoadingSpinner'

type FeedState = {
  page: number
}

class Feed extends React.Component<FeedProps, FeedState> {
  constructor(props: FeedProps) {
    super(props)
    this.state = {
      page: 1,
    }
    this.loadPageData = this.loadPageData.bind(this)
  }

  componentDidMount() {
    this.loadPageData()
  }

  componentDidUpdate(prevProps: FeedProps) {
    const { userId, clearPosts } = this.props
    if (userId !== prevProps.userId) {
      clearPosts()
      this.setState({ page: 1 }, this.loadPageData)
    }
  }

  componentWillUnmount() {
    const { clearPosts } = this.props
    clearPosts()
  }

  loadPageData() {
    const { fetchFeedPosts } = this.props
    const { page } = this.state
    fetchFeedPosts(page)
    this.setState({ page: page + 1 })
  }

  render() {
    const { users, userId, posts, likes, loading } = this.props
    const profileUser = users[userId]
    return (
      <div className='feed-container'>
        <div className='feed-header'>
          <h2>
            <i className='fas fa-th' />
            latest posts
          </h2>
        </div>
        {posts && likes && profileUser && (
          <>
            <PostsIndex posts={posts} likes={likes} type={PostsIndexType.feed} />
            {loading.postPage && <LoadingSpinner />}
            <Waypoint onEnter={this.loadPageData} />
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: AuthenticatedGlobalState) => {
  const userId = state.session.currentUser.slug
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userId,
    likes: state.entities.likes.posts,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchFeedPosts: (page: number) => dispatch(fetchFeedPostsAction(page)),
  clearPosts: () => dispatch(clearPostsAction()),
})

export type FeedProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>

export default connect(mapStateToProps, mapDispatchToProps)(Feed)

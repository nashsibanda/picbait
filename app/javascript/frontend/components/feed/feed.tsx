import React from 'react'
import { Waypoint } from 'react-waypoint'
import { PostsIndexType } from '../../types/entities'
import PostsIndex from '../posts/posts_index'
import LoadingSpinner from '../ui/loading_spinner'
import { FeedProps } from './feed_container'

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

export default Feed

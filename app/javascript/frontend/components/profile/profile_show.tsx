import React from 'react'
import { Waypoint } from 'react-waypoint'
import { PostsIndexType } from '../../types/entities'
import PostsIndex from '../posts/posts_index'
import LoadingSpinner from '../ui/loading_spinner'
import { ProfileShowProps } from './profile_show_container'
import ProfileUserInfoContainer from './profile_user_info_container'

type ProfileShowState = {
  page: number
}

class ProfileShow extends React.Component<ProfileShowProps, ProfileShowState> {
  constructor(props: ProfileShowProps) {
    super(props)
    this.state = {
      page: 1,
    }
    this.loadPageData = this.loadPageData.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
  }

  componentDidMount() {
    this.loadPageData()
  }

  componentDidUpdate(prevProps: ProfileShowProps) {
    const { userSlug, clearPosts } = this.props
    if (userSlug !== prevProps.userSlug) {
      clearPosts()
      this.setState({ page: 1 }, this.loadPageData)
    }
  }

  componentWillUnmount() {
    const { clearPosts } = this.props
    clearPosts()
  }

  loadPosts() {
    const { userSlug, fetchUserPosts } = this.props
    const { page } = this.state
    fetchUserPosts(userSlug, page)
    this.setState({ page: page + 1 })
  }

  loadPageData() {
    const { fetchUsers, userSlug, fetchFollowers, fetchFollowings } = this.props
    fetchUsers({ user_id: userSlug })
    this.loadPosts()
    fetchFollowings(userSlug)
    fetchFollowers(userSlug)
  }

  render() {
    const { users, userSlug, posts, ownProfile, likes, loading } = this.props
    const profileUser = users[userSlug]
    return (
      <div className='profile-show-container'>
        {profileUser && <ProfileUserInfoContainer user={profileUser} ownProfile={ownProfile} />}
        {posts && likes && profileUser && (
          <>
            <PostsIndex posts={posts} likes={likes} type={PostsIndexType.profile} />
            {loading.postPage && <LoadingSpinner className='inline-padding' />}
            <Waypoint onEnter={this.loadPosts} />
          </>
        )}
      </div>
    )
  }
}

export default ProfileShow

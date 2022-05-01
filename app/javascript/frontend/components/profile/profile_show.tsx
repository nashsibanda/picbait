import React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { Waypoint } from 'react-waypoint'
import {
  fetchFollowers as fetchFollowersAction,
  fetchFollowings as fetchFollowingsAction,
} from '../../actions/follow_actions'
import { clearPosts as clearPostsAction, fetchUserPosts as fetchUserPostsAction } from '../../actions/post_actions'
import { fetchUsers as fetchUsersAction } from '../../actions/user_actions'
import { PostsIndexType } from '../../types/entities'
import { GlobalDispatch, GlobalState } from '../../types/state'
import { GetUsersParams } from '../../util/users_api_util'
import PostsIndex from '../posts/posts_index'
import LoadingSpinner from '../ui/loading_spinner'
import ProfileUserInfo from './profile_user_info'

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
        {profileUser && <ProfileUserInfo user={profileUser} ownProfile={ownProfile} />}
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

const mapStateToProps = (state: GlobalState, { match: matchObject }: { match: match<{ userSlug: string }> }) => {
  const { userSlug } = matchObject.params
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userSlug,
    ownProfile: userSlug === state.session.currentUser?.slug,
    likes: state.entities.likes.posts,
    followers: state.entities.follows.followers,
    following: state.entities.follows.following,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchUserPosts: (userId: string, page: number) => dispatch(fetchUserPostsAction(userId, page)),
  fetchUsers: (filters: GetUsersParams) => dispatch(fetchUsersAction(filters)),
  fetchFollowers: (userSlug: string) => dispatch(fetchFollowersAction(userSlug)),
  fetchFollowings: (userSlug: string) => dispatch(fetchFollowingsAction(userSlug)),
  clearPosts: () => dispatch(clearPostsAction()),
})

export type ProfileShowProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow)

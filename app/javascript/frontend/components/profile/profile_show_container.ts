import { connect } from 'react-redux'
import { match } from 'react-router'
import { fetchFollowers, fetchFollowings } from '../../actions/follow_actions'
import { clearPosts, fetchUserPosts } from '../../actions/post_actions'
import { fetchUsers } from '../../actions/user_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import { GetUsersParams } from '../../util/users_api_util'
import ProfileShow from './profile_show'

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
  fetchUserPosts: (userId: string, page: number) => dispatch(fetchUserPosts(userId, page)),
  fetchUsers: (filters: GetUsersParams) => dispatch(fetchUsers(filters)),
  fetchFollowers: (userSlug: string) => dispatch(fetchFollowers(userSlug)),
  fetchFollowings: (userSlug: string) => dispatch(fetchFollowings(userSlug)),
  clearPosts: () => dispatch(clearPosts()),
})

export type ProfileShowProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow)

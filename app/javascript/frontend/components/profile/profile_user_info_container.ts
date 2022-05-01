import { connect } from 'react-redux'
import { createFollow, deleteFollow } from '../../actions/follow_actions'
import { fetchUsers, updateUser } from '../../actions/user_actions'
import { UserEntity } from '../../types/entities'
import { GlobalDispatch, GlobalState } from '../../types/state'
import { GetUsersParams } from '../../util/users_api_util'
import ProfileUserInfo from './profile_user_info'

const mapStateToProps = (state: GlobalState) => ({
  currentUser: state.session.currentUser,
  followers: state.entities.follows.followers,
  following: state.entities.follows.following,
  // @ts-expect-error : This is a protected route
  followStatus: !!state.entities.follows.followers[state.session.currentUser.slug],
  users: state.entities.users,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  updateUser: (id: string, formUser: FormData) => dispatch(updateUser(id, formUser)),
  createFollow: (userId: number) => dispatch(createFollow(userId)),
  deleteFollow: (userId: number) => dispatch(deleteFollow(userId)),
  fetchUsers: (filters: GetUsersParams) => dispatch(fetchUsers(filters)),
})

export type ProfileUserInfoProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & { user: UserEntity; ownProfile: boolean }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserInfo)

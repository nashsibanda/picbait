import { MouseEventHandler } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/user_actions'
import { FollowType, UserEntity } from '../../types/entities'
import { FollowersState, GlobalDispatch, UsersState } from '../../types/state'
import { GetUsersParams } from '../../util/users_api_util'
import FollowersIndex from './followers_index'

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchUsers: (filters: GetUsersParams) => dispatch(fetchUsers(filters)),
})

export type FollowersIndexProps = ReturnType<typeof mapDispatchToProps> & {
  user: UserEntity
  list: FollowType
  users: UsersState
  follows: FollowersState
  close: MouseEventHandler
}

export default connect(null, mapDispatchToProps)(FollowersIndex)

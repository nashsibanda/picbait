import React, { MouseEventHandler, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/userActions'
import { FollowType } from '../../types/entities'
import { FollowersState, GlobalDispatch, UsersState } from '../../types/state'
import { GetUsersParams } from '../../util/usersApiUtil'
import FollowersIndexItem from './FollowersIndexItem'

const FollowersIndex = ({ follows, users, list, close }: FollowersIndexProps) => (
  <ul className='follows-list' onClick={(e: SyntheticEvent) => e.stopPropagation()} role='presentation'>
    <h2>{list}</h2>
    {Object.keys(follows).map(slug => {
      const user = users[slug]

      return user && <FollowersIndexItem user={user} key={slug} />
    })}
    <button type='button' onClick={close} className='followers-modal-close'>
      <i className='fas fa-times-circle' />
    </button>
  </ul>
)

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchUsers: (filters: GetUsersParams) => dispatch(fetchUsers(filters)),
})

export type FollowersIndexProps = Required<ReturnType<typeof mapDispatchToProps>> & {
  list: FollowType
  users: UsersState
  follows: FollowersState
  close: MouseEventHandler
}

export default connect(null, mapDispatchToProps)(FollowersIndex)

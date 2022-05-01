import React, { SyntheticEvent } from 'react'
import { FollowersIndexProps } from './followers_index_container'
import FollowersIndexItem from './followers_index_item'

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

export default FollowersIndex

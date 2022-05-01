import React from 'react'
import { Link } from 'react-router-dom'
import { UserEntity } from '../../types/entities'
import { makeShortString } from '../../util/miscUtil'

type FollowersIndexItemProps = {
  user: UserEntity
}

const FollowersIndexItem = ({ user }: FollowersIndexItemProps) => {
  const { slug, avatarUrl, username, bio } = user
  return (
    <li className='followers-index-item'>
      <div className='avatar'>
        <Link to={`/users/${slug}`}>
          <button
            type='button'
            className='container'
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
            aria-label={`Go to ${username}'s profile`}
          />
        </Link>
      </div>
      <div className='details'>
        <div className='username'>
          <Link to={`/users/${slug}`}>{username}</Link>
        </div>
        <div className='mini-bio'>{bio ? <span>{makeShortString(bio, 40)}</span> : <span />}</div>
      </div>
    </li>
  )
}

export default FollowersIndexItem

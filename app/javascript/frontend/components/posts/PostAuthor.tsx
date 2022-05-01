import React from 'react'
import { Link } from 'react-router-dom'
import { UserEntity } from '../../types/entities'

type PostAuthorProps = {
  author: UserEntity
}

const PostAuthor = ({ author }: PostAuthorProps) => {
  const { slug, avatarUrl, username, bio } = author
  return (
    <div className='post-author'>
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
        <div className='mini-bio' title={bio}>
          {bio}
        </div>
      </div>
    </div>
  )
}

export default PostAuthor

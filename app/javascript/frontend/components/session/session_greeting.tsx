import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/session_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'

const SessionGreeting = ({ currentUser, logOut }: SessionGreetingProps) => (
  <div className='session-greeting'>
    {currentUser ? (
      <div className='vertical-menu'>
        <p className='session-welcome-text'>
          Welcome, <Link to={`/users/${currentUser.slug}`}>{currentUser.username}</Link>
        </p>
        <div className='logged-in-menu horizontal-menu'>
          <Link to={`/users/${currentUser.slug}`}>
            <button type='button' className='header-button profile-button'>
              <i className='fas fa-user' />
              <span className='button-text'>Profile</span>
            </button>
          </Link>
          <Link to='/posts/new'>
            <button type='button' className='header-button'>
              <i className='fas fa-plus-square' />
              <span className='button-text'>New Post</span>
            </button>
          </Link>
          <button type='button' onClick={logOut} className='header-button'>
            <i className='fas fa-sign-out-alt' />
            <span className='button-text'>Log Out</span>
          </button>
        </div>
      </div>
    ) : (
      <div className='logged-out-menu horizontal-menu'>
        <Link to='/signup' className='header-button'>
          Sign Up
        </Link>
        <Link to='/login' className='header-button'>
          Log In
        </Link>
      </div>
    )}
  </div>
)

SessionGreeting.defaultProps = {
  currentUser: null,
}

const mapStateToProps = (state: GlobalState) => {
  const { entities, session } = state
  return {
    currentUser: session.currentUser ? entities.users[session.currentUser.slug] : null,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  logOut: () => dispatch(logout()),
})

type SessionGreetingProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>

export default connect(mapStateToProps, mapDispatchToProps)(SessionGreeting)

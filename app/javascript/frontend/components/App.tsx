import React from 'react'
import { Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/routeUtil'
import Feed from './feed/Feed'
import NewPostForm from './posts/PostForm'
import PostShow from './posts/PostShow'
import ProfileShow from './profile/ProfileShow'
import { LoginForm, SignUpForm } from './session/SessionForm'
import SessionGreeting from './session/SessionGreeting'
import Splash from './splash/Splash'

const DebugMenu = () => (
  <div className='debug-menu'>
    <h4>DEBUG MENU:</h4>
    <Link to='/'>Root</Link>
    <Link to='/signup'>Sign Up</Link>
    <Link to='/login'>Log In</Link>
    <Link to='/users/nash'>Profile Show</Link>
    <Link to='/feed'>Feed</Link>
    <Link to='/posts/new'>New Post</Link>
    <Link to='/posts/1'>Post Show</Link>
    <Link to='/posts/13'>Commented Post</Link>
  </div>
)

const App = () => (
  <div className='app-container'>
    {false && <DebugMenu />}
    <header>
      <div className='header-container'>
        <h1>
          <Link to='/'>picbait</Link>
        </h1>
        <SessionGreeting />
      </div>
    </header>
    <main>
      <Switch>
        <ProtectedRoute exact path='/posts/new' component={NewPostForm} />
        <ProtectedRoute path='/users/:userSlug' component={ProfileShow} />
        <ProtectedRoute exact path='/posts/:postId' component={PostShow} />
        <ProtectedRoute exact path='/feed' component={Feed} />
        <AuthRoute path='/signup' component={SignUpForm} />
        <AuthRoute path='/login' component={LoginForm} />
        <AuthRoute path='/' component={Splash} />
      </Switch>
    </main>
    <footer>
      <ul className='footer-menu'>
        <li>
          <a href='http://nashsibanda.com'>nashsibanda.com</a>
        </li>
        <li>
          <a href='https://github.com/nashsibanda/picbait'>github</a>
        </li>
      </ul>
    </footer>
  </div>
)

export default App

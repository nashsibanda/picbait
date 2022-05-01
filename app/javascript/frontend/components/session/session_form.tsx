import React, { SyntheticEvent } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'
import { ApiErrors, SessionUser, User } from '../../types/entities'
import LoadingSpinner from '../ui/loading_spinner'
import LoginRodrick from './login_rodrick'

export type SessionFormProps = {
  errors: ApiErrors
  formType: 'signup' | 'login'
  loading: boolean
  processForm: (user: SessionUser) => void
}

type SessionFormState = {
  username: string
  password: string
  email: string
  usernameIndicator: boolean
  passwordIndicator: boolean
}

class SessionForm extends React.Component<SessionFormProps, SessionFormState> {
  constructor(props: SessionFormProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      usernameIndicator: false,
      passwordIndicator: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.toggleIndicator = this.toggleIndicator.bind(this)
  }

  handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    const { username, password, email } = this.state
    const { processForm } = this.props
    const user: User = {
      username,
      password,
      email,
      lowercase_username: username.toLowerCase(),
    }
    processForm(user)
  }

  toggleIndicator(indicator: keyof Pick<SessionFormState, 'usernameIndicator' | 'passwordIndicator'>) {
    const { [indicator]: currentValue } = this.state
    return () => this.setState(prevState => ({ ...prevState, [indicator]: !currentValue }))
  }

  updateProperty(property: keyof Pick<SessionFormState, 'email' | 'password' | 'username'>) {
    return (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement
      this.setState(prevState => ({ ...prevState, [property]: target.value }))
    }
  }

  render() {
    const { formType, errors, loading } = this.props
    const { username, password, email, usernameIndicator, passwordIndicator } = this.state
    const formHeader = () => {
      switch (formType) {
        case 'signup':
          return 'Sign Up'
        case 'login':
          return 'Log In'
        default:
          return ''
      }
    }

    const redirectLink = () => {
      switch (formType) {
        case 'signup':
          return '/login'
        case 'login':
          return '/signup'
        default:
          return ''
      }
    }

    const redirectLinkTitle = () => {
      switch (formType) {
        case 'signup':
          return 'Already registered? Click here to log in...'
        case 'login':
          return 'Not yet registered? Click here to sign up...'
        default:
          return ''
      }
    }
    return (
      <div className='session-form-container'>
        <h2>{formHeader()}</h2>
        <LoginRodrick className='form-submit-button' />
        <form className={`session-form ${formType}-form`} onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='session-form-username'>
              {formType === 'signup' ? 'Username' : 'Username or Email Address'}
            </label>
            <input
              type='text'
              onChange={this.updateProperty('username')}
              placeholder={formType === 'signup' ? 'Username' : 'Username or Email Address'}
              id='session-form-username'
              value={username}
              onFocus={this.toggleIndicator('usernameIndicator')}
              onBlur={this.toggleIndicator('usernameIndicator')}
              maxLength={50}
              required
            />
            {usernameIndicator && formType === 'signup' && (
              <CircularProgressbar value={username.length} maxValue={50} />
            )}
          </div>
          {formType === 'signup' && (
            <div>
              <label htmlFor='session-form-email'>Email Address</label>
              <input
                type='email'
                onChange={this.updateProperty('email')}
                placeholder='Email Address'
                id='session-form-email'
                value={email}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor='session-form-password'>Password</label>
            <input
              type='password'
              onChange={this.updateProperty('password')}
              placeholder='Password'
              id='session-form-password'
              value={password}
              onFocus={this.toggleIndicator('passwordIndicator')}
              onBlur={this.toggleIndicator('passwordIndicator')}
              maxLength={20}
              required
            />
            {passwordIndicator && formType === 'signup' && (
              <CircularProgressbar value={password.length} maxValue={20} minValue={6} />
            )}
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <button type='submit' className='form-submit-button'>
                {formHeader()}
              </button>
              <Link to={redirectLink()} className='form-redirect-link'>
                {redirectLinkTitle()}
              </Link>
            </div>
          )}
          {errors.length > 0 && (
            <ul className='form-errors'>
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    )
  }
}

export default SessionForm

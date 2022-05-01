/* eslint-disable react/no-unused-state */
// TODO: Use loadingAvatar state in render()
import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { sanitizeContent } from '../../util/misc_util'
import FollowersIndexContainer from '../followers/followers_index_container'
import { ProfileUserInfoProps } from './profile_user_info_container'

type ProfileUserInfoState = {
  newAvatarUrl: string | ArrayBuffer | null
  newAvatarFile: File | null
  followerCount: number
  followingCount: number
  showFollowers: boolean
  showFollowing: boolean
  displayAvatarEl: Element | null
  showBioForm: boolean
  formBio: string
  loadingAvatar: boolean
}

class ProfileUserInfo extends React.Component<ProfileUserInfoProps, ProfileUserInfoState> {
  avatarInput: HTMLInputElement | null

  avatarPreview: HTMLDivElement | null

  constructor(props: ProfileUserInfoProps) {
    super(props)
    this.state = {
      newAvatarUrl: '',
      newAvatarFile: null,
      followerCount: Object.keys(props.followers).length,
      followingCount: Object.keys(props.following).length,
      showFollowers: false,
      showFollowing: false,
      displayAvatarEl: null,
      showBioForm: false,
      formBio: props.user.bio || '',
      loadingAvatar: true,
    }
    this.handleNewAvatar = this.handleNewAvatar.bind(this)
    this.submitNewAvatar = this.submitNewAvatar.bind(this)
    this.clearNewAvatar = this.clearNewAvatar.bind(this)
    this.toggleFollow = this.toggleFollow.bind(this)
    this.toggleFollowingIndex = this.toggleFollowingIndex.bind(this)
    this.toggleFollowersIndex = this.toggleFollowersIndex.bind(this)
    this.displayAvatar = this.displayAvatar.bind(this)
    this.toggleBioForm = this.toggleBioForm.bind(this)
    this.updateBio = this.updateBio.bind(this)
    this.submitNewBio = this.submitNewBio.bind(this)
    this.cancelBioUpdate = this.cancelBioUpdate.bind(this)
    this.avatarInput = null
    this.avatarPreview = null
  }

  componentDidUpdate(prevProps: ProfileUserInfoProps) {
    const { followers, following, user } = this.props
    if (followers !== prevProps.followers) {
      this.setState({
        followerCount: Object.keys(followers).length,
      })
    }
    if (following !== prevProps.following) {
      this.setState({
        followingCount: Object.keys(following).length,
      })
    }
    if (user !== prevProps.user) {
      this.setState({
        showFollowing: false,
        showFollowers: false,
        showBioForm: false,
      })
    }
  }

  handleNewAvatar(e: SyntheticEvent) {
    this.setState({ loadingAvatar: true, displayAvatarEl: null })
    const reader = new FileReader()
    const target = e.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    reader.onloadend = () => this.setState({ newAvatarUrl: reader.result, newAvatarFile: file }, this.displayAvatar)

    if (file) {
      reader.readAsDataURL(file)
    } else {
      this.setState({
        newAvatarUrl: '',
        newAvatarFile: null,
        loadingAvatar: false,
      })
    }
  }

  toggleFollowingIndex() {
    this.setState(prevState => ({
      showFollowing: !prevState.showFollowing,
      showFollowers: false,
    }))
  }

  toggleBioForm() {
    this.setState(prevState => ({ showBioForm: !prevState.showBioForm }))
  }

  updateBio(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    this.setState({ formBio: e.target.value })
  }

  cancelBioUpdate(e: SyntheticEvent) {
    e.preventDefault()
    const { user } = this.props
    this.setState({ formBio: user.bio || '', showBioForm: false })
  }

  clearNewAvatar(e: SyntheticEvent) {
    e.preventDefault()
    this.setState({
      newAvatarUrl: '',
      newAvatarFile: null,
      displayAvatarEl: null,
    })
    if (this.avatarInput) {
      this.avatarInput.value = ''
    }
  }

  toggleFollowersIndex() {
    this.setState(prevState => ({
      showFollowers: !prevState.showFollowers,
      showFollowing: false,
    }))
  }

  displayAvatar() {
    const { newAvatarUrl, displayAvatarEl } = this.state
    // @ts-expect-error
    loadImage(
      newAvatarUrl,
      (img: Element) => {
        this.setState({ displayAvatarEl: img }, () => {
          if (displayAvatarEl instanceof Element && this.avatarPreview) {
            this.avatarPreview.appendChild(displayAvatarEl)
          } else {
            // eslint-disable-next-line no-alert
            alert('This is not a valid image file format!')
          }
        })
      },
      {
        orientation: true,
        aspectRatio: 1 / 1,
        cover: true,
      }
    )
  }

  submitNewAvatar(e: FormEvent) {
    e.preventDefault()
    const formUser = new FormData()
    const { newAvatarFile } = this.state
    const { user, updateUser } = this.props
    const { slug } = user
    formUser.append('user[avatar]', newAvatarFile as File)
    updateUser(slug, formUser)
    this.setState({
      newAvatarUrl: '',
      newAvatarFile: null,
      displayAvatarEl: null,
    })
  }

  submitNewBio(e: FormEvent) {
    e.preventDefault()
    const formUser = new FormData()
    const { formBio } = this.state
    const { user, updateUser } = this.props
    const { slug } = user
    formUser.append('user[bio]', sanitizeContent(formBio))
    updateUser(slug, formUser)
    this.setState({ showBioForm: false })
  }

  toggleFollow() {
    const { followStatus, createFollow, deleteFollow, user } = this.props
    const { id } = user
    if (followStatus) {
      deleteFollow(id)
    } else {
      createFollow(id)
    }
  }

  render() {
    const { ownProfile, followStatus, user, followers, following, users } = this.props
    const { username, bio, postCount, avatarUrl } = user
    const {
      newAvatarUrl,
      followerCount,
      followingCount,
      showFollowers,
      showFollowing,
      displayAvatarEl,
      showBioForm,
      formBio,
    } = this.state
    return (
      <div className='profile-user-info'>
        <section className='avatar'>
          <div
            className='container'
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
          >
            {displayAvatarEl && (
              <div
                className='avatar-preview'
                ref={ref => {
                  this.avatarPreview = ref
                }}
              />
            )}
            {ownProfile && (
              <>
                <input
                  type='file'
                  onChange={this.handleNewAvatar}
                  id='edit-avatar-input'
                  ref={el => {
                    this.avatarInput = el
                  }}
                />
                <label className='edit-avatar-icon' htmlFor='edit-avatar-input'>
                  <i className='fas fa-camera' />
                </label>
                {newAvatarUrl && (
                  <form onSubmit={this.submitNewAvatar} className='edit-avatar-form'>
                    <button type='submit' className='submit-button'>
                      <i className='fas fa-save' /> Save
                    </button>
                    <button type='button' className='close-button' onClick={this.clearNewAvatar}>
                      <i className='fas fa-times' />
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </section>
        <section className='details'>
          <div className='title'>
            <span className='username'>{username}</span>
            <span className='follow'>
              {!ownProfile && (
                <button
                  type='button'
                  className={`follow-button ${followStatus ? 'following' : 'not-following'}`}
                  onClick={this.toggleFollow}
                >
                  {followStatus ? 'Following' : 'Follow'}
                </button>
              )}
            </span>
          </div>
          <div className='stats'>
            <span className='post-count'>
              <strong>{postCount}</strong> posts
            </span>
          </div>
          {showBioForm ? (
            <form onSubmit={this.submitNewBio} className='bio'>
              <div>
                <textarea placeholder='Add a short bio...' value={formBio} onChange={this.updateBio} maxLength={200} />
                <CircularProgressbar value={formBio.length} maxValue={200} />
              </div>
              <div className='submit-buttons'>
                <button type='submit' className='bio-button'>
                  <i className='fas fa-save' /> <span className='button-text'>Save</span>
                </button>
                <button type='button' className='bio-button' onClick={this.cancelBioUpdate}>
                  <i className='fas fa-times' /> <span className='button-text'>Cancel</span>
                </button>
              </div>
            </form>
          ) : (
            <div className='bio'>
              <p>{bio}</p>
              {ownProfile && (
                <button type='button' className='bio-button' onClick={this.toggleBioForm}>
                  <i className='fas fa-edit' /> <span className='button-text'>Edit bio...</span>
                </button>
              )}
            </div>
          )}
          <div className='follows-buttons'>
            <button type='button' className='follower-users' onClick={this.toggleFollowersIndex}>
              {followerCount} Followers
            </button>
            <button type='button' className='following-users' onClick={this.toggleFollowingIndex}>
              Following {followingCount}
            </button>
          </div>
          {showFollowers && users && followers && (
            <div className='follows-modal' onClick={this.toggleFollowersIndex}>
              <FollowersIndexContainer
                user={user}
                list='Followers'
                users={users}
                follows={followers}
                close={this.toggleFollowersIndex}
              />
            </div>
          )}
          {showFollowing && users && following && (
            <div className='follows-modal' onClick={this.toggleFollowingIndex}>
              <FollowersIndexContainer
                user={user}
                list='Following'
                users={users}
                follows={following}
                close={this.toggleFollowingIndex}
              />
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default ProfileUserInfo

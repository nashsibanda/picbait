# Picbait - An Instagram "Clone"

## [**Live Site**](http://picbait.herokuapp.com/)

"Clone" is purposely placed between quotes above. _Picbait_ is very unlikely to become a fully fledged reproduction. What it will be is certainly Instagram inspired, though. I hope. Who knows? Anyway, let's get cracking.

Thanks to Jayc for the name <3.

## Aim

Put together a full-stack, bottom-up web application. APIs, CRUD, single-page functionality, the works.

## Intended Features

### _Non-essential features are italicised below_

- **Users**
  - People can sign up to the site. Pick a username and password.
  - Users will have a profile, showing all their posts, with links to profile info.
  - Users can follow each other. Profiles will show numbers of followers, and who the profile owner is following.
  - _Users can choose an avatar, or otherwise have a default avatar assigned._
  - _Users can send private direct messages to one another_
- **Posts**
  - Users can post images to their profiles.
  - Users can like posts.
  - _Posts can be tagged._
  - _Posts can be geotagged._
- **Feed**
  - Users get a custom feed of posts posted by people they follow.
  - Feed is infinitely scrolling.
- **Comments**
  - Users can comment on posts.
  - _Users can like comments._
  - _Users can respond to other comments_
  - Comments include links to commenter profiles.

## Technologies Used

- Ruby on Rails 6
  - jBuilder
- React
  - Redux
- PostgreSQL
- jQuery

## Changelog

Version numbers reflect heroku versioning.

### Major changes to make

- _Fix image rotation on upload in preview_
- Add direct messaging
  - Add message threads
  - Add group message threads
- Add geolocation with Google Maps API
- Add user preferences
  - Allow users to choose ascending or descending comments

### v15

- _Circle indicator is broken for comments on mobile_
- _Deffo need progress indicators, etc._
- _Followers/Following buttons on profile are too close together - tied to bio width!_
- _Weird waiting text at bottom of feed? Only sometimes??_
- _Get rid of the “Bournemouth, England” placeholder; replace with bio maybe?_

### v16

- _Fix pink colour change for svg icons; put class on container button?_
- _Make a default login_
- _Automatically make new users follow some seed users, and me_

### v17

- _Larger file uploads_
- _Fix comment length radial switch_

### v18

- _Followers/following lists are not working properly_
  - _Lists not fully populated_
- _Should only be able to tag existing users_
- _Only allow image files_
- _Add proper email validation (ValidEmail2 gem)_
- **Image rotation fixed on upload in preview!**
- _Likes in post modal are reflected immediately in post index_

### v19

- _Add imagemagick to heroku buildpacks_

### v20

- New post form upload button:
  - _Add margin next to icon_
  - _Allow clicks to work everywhere on the button_
- _Fix un-liking from post index_

### v21 - Current

- Schedule database cleanup every hour

### v22 - Next

- Migration to Typescript
- Fix a11y compliance
### v23 - Future

- Time for direct messaging!
- Sanitize user input before saving to database.
- Fix avatar preview in user profile.
- Allow bio editing from user profile.

<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ... -->

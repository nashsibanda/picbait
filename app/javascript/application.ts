// Entry point for the build script in your package.json
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@hotwired/turbo-rails'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './frontend/components/root'
import configureStore from './store'

library.add(fas, faTwitter)
// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch()

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  let store
  if (window.currentUser) {
    const { slug, id } = window.currentUser
    const preloadedState = {
      entities: {
        users: { [slug]: window.currentUser },
      },
      session: { currentUser: { id: id, slug: slug } },
    }
    store = configureStore(preloadedState)
    const script = document.getElementById('current-user-bootstrap')
    script.remove()
  } else {
    store = configureStore()
  }
  ReactDOM.render(<Root store={store} />, root)
})

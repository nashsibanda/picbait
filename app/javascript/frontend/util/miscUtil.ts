import { AxiosStatic } from 'axios'
import sanitizeHtml from 'sanitize-html'
import { UsersAutocompleteState } from '../types/state'

export const setToken = (axios: AxiosStatic) => {
  const token = document.head.querySelector('meta[name="csrf-token"]')
  if (token && token.getAttribute('content')) {
    // eslint-disable-next-line no-param-reassign
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content') || ''
  } else {
    // eslint-disable-next-line no-console
    console.error('CSRF Token not found!')
  }
}

export const sanitizeContent = (text: string) =>
  sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  })

export const capitalize = (string: string, separator = ' ') => {
  const wordsArray = string.split(separator).map(word => {
    const chArray = word.split('')
    chArray[0] = chArray[0].toUpperCase()
    return chArray.join('')
  })
  return wordsArray.join(separator)
}

export const makeShortTitle = (title: string) => {
  if (title.length > 60) {
    return `${title.slice(0, 57)}...`
  }
  return title
}

export const makeShortString = (string: string, length: number) => {
  if (string.length > length) {
    return `${string.slice(0, length)}...`
  }
  return string
}

export const makeCommentLinks = (commentBody: string, autocomplete: UsersAutocompleteState) => {
  const tagRegExp = /\B([@])[\w.-]+(?!\s)[\w-]/g
  const cleanBody = sanitizeContent(commentBody)
  const replacer = (match: string) => {
    if (autocomplete[match.slice(1)]) {
      const [username, slug] = autocomplete[match.slice(1)]
      return `<a class=comment-profile-link href=#/users/${slug}>@${username}</a>`
    }
    return match
  }
  return cleanBody.replace(tagRegExp, replacer)
}

export const replaceParentCommenter = (commenter: string | null, body: string) => {
  const tagRegExp = /^([@])[\w.-]+(?!\s)[\w-]/
  const parentTag = body.match(tagRegExp)
  if (!commenter) {
    return ''
  }
  if (parentTag && parentTag.length > 0) {
    return body.replace(tagRegExp, `@${commenter}`)
  }
  return `@${commenter} ${body}`
}

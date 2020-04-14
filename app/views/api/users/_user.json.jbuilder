# frozen_string_literal: true

full_details ||= true
json.extract! user, :username, :id, :slug
json.avatarUrl rails_blob_path(user.avatar, disposition: 'attachment')
if full_details
  json.bio user.bio
  json.postCount user.posts.count
end

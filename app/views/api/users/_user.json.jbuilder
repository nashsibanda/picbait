# frozen_string_literal: true

full_details ||= false
json.extract! user, :username, :email, :id, :slug
if full_details
  json.bio user.bio
  json.postCount user.posts.count
end

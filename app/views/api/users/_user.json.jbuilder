# frozen_string_literal: true

full_details ||= false
json.extract! user, :username, :id, :slug
json.avatarUrl rails_blob_path(user.avatar, disposition: 'attachment')
json.bio user.bio
json.postCount user.posts.count
json.postIds user.posts.all.pluck(:id)

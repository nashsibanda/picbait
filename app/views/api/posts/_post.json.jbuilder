# frozen_string_literal: true

full_post_info ||= false
json.extract! post, :id, :title, :description, :created_at
json.authorSlug post.author.slug
json.imageUrl rails_blob_path(post.image, disposition: 'attachment')
json.date post.created_at.strftime('%H:%M, %a %d %b %Y')
json.likes post.likes
json.creationNum post.created_at.to_f
# if full_post_info
#   json.author do
#     json.id post.author.id
#     json.username post.author.username
#     json.slug post.author.slug
#     json.avatarUrl rails_blob_path(post.author.avatar, disposition: 'attachment')
#   end
# end

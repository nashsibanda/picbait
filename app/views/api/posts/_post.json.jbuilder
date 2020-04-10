# frozen_string_literal: true

json.extract! post, :id, :title, :description, :created_at
json.author_id post.author.id
json.imageUrl rails_blob_path(post.image, disposition: 'attachment')
json.date post.created_at.strftime('%H:%M, %a %d %b %Y')

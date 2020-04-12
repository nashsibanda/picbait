# frozen_string_literal: true

json.extract! comment, :body
json.date comment.created_at.strftime('%H:%M, %a %d %b %Y')
json.commenter do
  json.extract! comment.commenter, :username, :slug, :id
  json.avatarUrl rails_blob_path(comment.commenter.avatar, disposition: 'attachment')
end
if !comment.child_comments.empty?
  json.child_comments do
    json.partial! 'api/comments/comment', collection: comment.child_comments, as: :comment
  end
else
  json.child_comments nil
end

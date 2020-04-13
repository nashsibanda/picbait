# frozen_string_literal: true

json.extract! comment, :body, :id
json.parentCommentId comment.parent_comment_id
json.date comment.created_at.strftime('%H:%M, %a %d %b %Y')
json.timeAgo time_ago_in_words(comment.created_at)
json.commenter comment.commenter.slug
# if !comment.child_comments.empty?
#   json.child_comments do
#     json.partial! 'api/comments/comment', collection: comment.child_comments, as: :comment
#   end
# else
#   json.child_comments nil
# end

# frozen_string_literal: true

after :subcomments do
  comment_liker_ids = Api::User.all.pluck(:id)
  comments_to_like_ids = Api::Comment.all.pluck(:id)

  comment_liker_ids.each do |user_id|
    comments_to_like = comments_to_like_ids.sample(rand(200))
    comments_to_like.each do |comment_id|
      like = Api::Like.create(likeable_type: 'Api::Comment', likeable_id: comment_id, api_user_id: user_id)
    end
  end
end

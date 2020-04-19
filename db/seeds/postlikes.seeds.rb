# frozen_string_literal: true

after :posts do
  post_liker_ids = Api::User.all.pluck(:id)
  posts_to_like_ids = Api::Post.all.pluck(:id)
  post_liker_ids.each do |user_id|
    posts_to_like = posts_to_like_ids.sample(rand(50))
    posts_to_like.each do |post_id|
      like = Api::Like.create(likeable_type: 'Api::Post', likeable_id: post_id, api_user_id: user_id)
    end
  end
end

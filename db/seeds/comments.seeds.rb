# frozen_string_literal: true

after :posts do
  commenter_user_ids = Api::User.all.pluck(:id)
  post_ids = Api::Post.all.pluck(:id)
  650.times do |_i|
    body = Faker::TvShows::Seinfeld.quote[0..180]
    api_user_id = commenter_user_ids.sample
    api_post_id = post_ids.sample
    Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id)
  end
end

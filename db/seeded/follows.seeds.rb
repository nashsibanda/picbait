# frozen_string_literal: true

after :users do
  follower_user_ids = Api::User.all.pluck(:id)
  follower_user_ids.each do |user_id|
    rand_num = rand(5..25)
    users_to_follow = follower_user_ids.sample(rand_num).reject { |x| x == user_id }
    users_to_follow.each do |followee_id|
      Api::Follow.create(follower_id: user_id, followee_id: followee_id)
    end
  end
end

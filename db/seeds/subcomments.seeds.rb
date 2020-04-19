# frozen_string_literal: true

after :comments do
  subcommenter_ids = Api::User.all.pluck(:id)
  post_offset = Api::Post.all.count
  max_comment_id = Api::Comment.all.pluck(:id).max
  75.times do |_i|
    body = Faker::TvShows::Seinfeld.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::Friends.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::HowIMetYourMother.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::TheITCrowd.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::TwinPeaks.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::TheFreshPrinceOfBelAir.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::NewGirl.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::RuPaul.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::GameOfThrones.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::Stargate.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::StrangerThings.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::MichaelScott.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::TvShows::Community.quotes[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::Movie.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::Movies::Lebowski.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end

  75.times do |_i|
    body = Faker::Movies::HarryPotter.quote[0..180]
    api_user_id = subcommenter_ids.sample
    rand_post = Api::Post.offset(rand(post_offset)).first
    next if rand_post.comments.empty?

    api_post_id = rand_post.id

    comment_ids = rand_post.comments.ids.reject { |x| x > max_comment_id }
    unless comment_ids.empty?
      parent_comment_id = comment_ids.sample
      Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
    end
  end
end

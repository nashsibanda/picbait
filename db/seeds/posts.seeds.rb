# frozen_string_literal: true

after :users do
  author_user_ids = Api::User.all.pluck(:id)
  100.times do |i|
    title = Faker::Book.title[0..150]
    description = Faker::Quote.famous_last_words[0..150]
    api_user_id = author_user_ids.sample
    post = Api::Post.new(title: title, description: description, api_user_id: api_user_id)
    image = open("http://nashsibanda.co.uk/seed_data/lores_photos/#{i % 243 + 1}.jpg")
    processed_image = ImageProcessing::MiniMagick.source(image).auto_orient.resize_to_fit(1200, 1200).call
    post.image.attach(io: processed_image, filename: "processed-#{i % 243 + 1}.jpg")
    post.save!
  end

  super_poster_ids = author_user_ids.sample(5)
  super_poster_ids.each do |super_poster_id|
    40.times do |i|
      title = Faker::Book.title[0..150]
      description = Faker::Quote.famous_last_words[0..150]
      api_user_id = super_poster_id
      post = Api::Post.new(title: title, description: description, api_user_id: api_user_id)
      image = open("http://nashsibanda.co.uk/seed_data/lores_photos/#{i % 243 + 1}.jpg")
      processed_image = ImageProcessing::MiniMagick.source(image).auto_orient.resize_to_fit(1200, 1200).call
      post.image.attach(io: processed_image, filename: "processed-#{i % 243 + 1}.jpg")
      post.save!
    end
  end
end

# frozen_string_literal: true

username = 'rodrick'
email = Faker::Internet.unique.safe_email(name: username)
bio = Faker::Quote.matz[0..150]
password = 'rodrick'
user = Api::User.new(username: username, email: email, bio: bio, password: password, lowercase_username: username.downcase)
avatar = open('http://nashsibanda.co.uk/seed_data/seed_lores_paintings/37.jpg')
processed_avatar = ImageProcessing::MiniMagick.source(avatar).auto_orient.resize_to_fit(600, 600).call
user.avatar.attach(io: processed_avatar, filename: '37.jpg')
user.save!

17.times do |i|
  username = Faker::Internet.unique.username(specifier: 6)
  email = Faker::Internet.unique.safe_email(name: username)
  bio = Faker::Quote.matz[0..150]
  password = '3CbzT52vJgBa88RD'
  user = Api::User.new(username: username, email: email, bio: bio, password: password, lowercase_username: username.downcase)
  avatar = open("http://nashsibanda.co.uk/seed_data/seed_lores_paintings/#{i % 37 + 1}.jpg")
  processed_avatar = ImageProcessing::MiniMagick.source(avatar).auto_orient.resize_to_fit(600, 600).call
  user.avatar.attach(io: processed_avatar, filename: "#{i % 37 + 1}.jpg")
  user.save!
end

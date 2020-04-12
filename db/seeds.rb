# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

100.times do |i|
  username = Faker::Internet.unique.username(specifier: 6)
  email = Faker::Internet.unique.safe_email(name: username)
  bio = Faker::Quote.matz[0..150]
  password = username
  user = Api::User.new(username: username, email: email, bio: bio, password: password, lowercase_username: username.downcase)
  avatar = File.open("temp_scratch/seed_lores_paintings/#{i % 37 + 1}.jpg")
  user.avatar.attach(io: avatar, filename: "#{i % 37 + 1}.jpg")
  user.save!
end

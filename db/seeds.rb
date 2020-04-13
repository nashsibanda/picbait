# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User seeds do
# 100.times do |i|
#   username = Faker::Internet.unique.username(specifier: 6)
#   email = Faker::Internet.unique.safe_email(name: username)
#   bio = Faker::Quote.matz[0..150]
#   password = username
#   user = Api::User.new(username: username, email: email, bio: bio, password: password, lowercase_username: username.downcase)
#   avatar = File.open("temp_scratch/seed_lores_paintings/#{i % 37 + 1}.jpg")
#   user.avatar.attach(io: avatar, filename: "#{i % 37 + 1}.jpg")
#   user.save!
# end
# end

# These are all the seeds generated in my db; your seed db will differ, so use Api::User.all.map{|x| x.id}.join(", ") in the console to get your own!

USER_IDS = [7, 8, 9, 10, 11, 12, 13, 14, 3, 4, 5, 6, 15, 16, 17, 18, 19, 20, 21, 22, 23, 69, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105].freeze
POST_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513].freeze
COMMENT_IDS = (1..2003).to_a.reject { |x| x === 2 }

USER_IDS.each do |user_id|
  posts_to_like = POST_IDS.sample(100)
  posts_to_like.each do |post_id|
    like = Api::Like.create(likeable_type: 'Api::Post', likeable_id: post_id, api_user_id: user_id)
  end
end

# 500.times do |i|
#   title = Faker::Book.title[0..150]
#   description = Faker::Quote.famous_last_words[0..150]
#   api_user_id = USER_IDS.sample
#   post = Api::Post.new(title: title, description: description, api_user_id: api_user_id)
#   image = File.open("temp_scratch/seed_photos/lores/#{i % 316 + 1}.jpg")
#   post.image.attach(io: image, filename: "#{i % 37 + 1}.jpg")
#   post.save!
# end

# 2000.times do |i|
#   body = Faker::TvShows::Seinfeld.quote[0..180]
#   api_user_id = USER_IDS.sample
#   api_post_id = POST_IDS.sample
#   Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id)
# end

# Sub-comment seeds
# 1.times do |one|
#   400.times do |_i|
#     body = Faker::TvShows::Seinfeld.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::FamilyGuy.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::Friends.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::HowIMetYourMother.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::BojackHorseman.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::SouthPark.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::TheITCrowd.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::TwinPeaks.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::TheFreshPrinceOfBelAir.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::SiliconValley.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::NewGirl.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::RuPaul.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::GameOfThrones.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::Stargate.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::StrangerThings.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::MichaelScott.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::TvShows::Community.quotes[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::Movie.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::Movies::Lebowski.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
#
#   400.times do |_i|
#     body = Faker::Movies::HarryPotter.quote[0..180]
#     api_user_id = USER_IDS.sample
#     rand_post = Api::Post.offset(rand(513)).first
#     api_post_id = rand_post.id
#     next if rand_post.comments.empty?
#
#     comment_ids = rand_post.comments.ids.reject { |x| x > 2003 }
#     unless comment_ids.empty?
#       parent_comment_id = comment_ids.sample
#       Api::Comment.create(body: body, api_post_id: api_post_id, api_user_id: api_user_id, parent_comment_id: parent_comment_id)
#     end
#   end
# end

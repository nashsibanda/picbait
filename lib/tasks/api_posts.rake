# frozen_string_literal: true

namespace :api_posts do
  desc 'Delete posts created after initial database seed.'
  task delete_new_posts: :environment do
    Api::Post.after_300.destroy_all
  end
end

# frozen_string_literal: true

namespace :api_users do
  desc 'Delete users created after initial database seed.'
  task delete_new_users: :environment do
    Api::User.after_18.destroy_all
  end
end

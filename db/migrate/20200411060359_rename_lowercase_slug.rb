# frozen_string_literal: true

class RenameLowercaseSlug < ActiveRecord::Migration[6.0]
  def change
    rename_column :api_users, :slug, :lowercase_username
    # Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end

# frozen_string_literal: true

class CreateApiPosts < ActiveRecord::Migration[6.0]
  def change
    create_table :api_posts do |t|
      t.string :title, null: false
      t.string :description
      t.references :api_user, foreign_key: true
      t.timestamps
    end
    add_index :api_posts, :title
  end
end

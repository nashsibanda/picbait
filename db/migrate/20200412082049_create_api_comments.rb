# frozen_string_literal: true

class CreateApiComments < ActiveRecord::Migration[6.0]
  def change
    create_table :api_comments do |t|
      t.string :body, null: false
      t.integer :parent_comment_id
      t.references :api_user, foreign_key: true
      t.references :api_post, foreign_key: true
      t.timestamps
    end
  end
end

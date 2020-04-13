# frozen_string_literal: true

class CreateApiLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :api_likes do |t|
      t.references :api_user, foreign_key: true
      t.references :likeable, polymorphic: true
      t.timestamps
    end
  end
end

# frozen_string_literal: true

class CreateApiFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :api_follows do |t|
      t.bigint :follower_id, null: false
      t.bigint :followee_id, null: false
      t.timestamps
    end

    add_index :api_follows, :followee_id
    add_index :api_follows, :follower_id
    add_index :api_follows, %i[followee_id follower_id], unique: true
  end
end

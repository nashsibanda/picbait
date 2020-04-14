# frozen_string_literal: true

class Api::Follow < ApplicationRecord
  validates :follower, uniqueness: { scope: :followee }
  belongs_to :follower, class_name: 'Api::User', foreign_key: 'follower_id'
  belongs_to :followee, class_name: 'Api::User', foreign_key: 'followee_id'
end

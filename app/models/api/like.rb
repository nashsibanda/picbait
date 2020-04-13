# frozen_string_literal: true

class Api::Like < ApplicationRecord
  validates :api_user_id, presence: true
  belongs_to :likeable, polymorphic: true
  belongs_to :liker, class_name: 'Api::User', foreign_key: 'api_user_id'
end

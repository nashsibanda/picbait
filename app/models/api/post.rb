# frozen_string_literal: true

class Api::Post < ApplicationRecord
  belongs_to :author, class_name: 'Api::User', foreign_key: 'api_user_id'
  has_one_attached :image
end

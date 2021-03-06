# frozen_string_literal: true

class Api::Post < ApplicationRecord
  include Likeable
  belongs_to :author, class_name: 'Api::User', foreign_key: 'api_user_id'
  has_one_attached :image
  has_many :comments, class_name: 'Api::Comment', foreign_key: 'api_post_id', dependent: :destroy

  validates :title, :api_user_id, presence: true
  validates_length_of :title, :description, maximum: 200, message: 'must be less than 200 characters long'
  validates :image, attached: true, size: { less_than: 4.megabytes, message: 'must be less than 4MB (got to watch that bandwidth!)' }, content_type: %i[png jpg jpeg gif]

  def self.after_300
    Api::Post.where('id > 300')
  end
end

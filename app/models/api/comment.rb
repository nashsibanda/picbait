# frozen_string_literal: true

class Api::Comment < ApplicationRecord
  include Likeable
  belongs_to :post, class_name: 'Api::Post', foreign_key: 'api_post_id'
  belongs_to :commenter, class_name: 'Api::User', foreign_key: 'api_user_id'
  has_many :child_comments, class_name: 'Api::Comment', foreign_key: 'parent_comment_id'
  belongs_to :parent_comment, class_name: 'Api::Comment', foreign_key: 'parent_comment_id', optional: true

  validates :body, :api_user_id, :api_post_id, presence: true
  validates_length_of :body, maximum: 200, message: 'must be less than 200 characters long'
end

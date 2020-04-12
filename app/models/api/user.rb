# frozen_string_literal: true

class Api::User < ApplicationRecord
  extend FriendlyId
  attr_reader :password

  has_many :posts, class_name: 'Api::Post', foreign_key: 'api_user_id'
  has_many :comments, class_name: 'Api::Comment', foreign_key: 'api_user_id'
  has_one_attached :avatar

  after_initialize :ensure_session_token
  before_validation :downcase_email
  validates :username, :lowercase_username, :email, :password_digest, presence: true
  validate :no_at_in_username
  validates_uniqueness_of :username, :email, on: :create, message: 'is already in use. Please use another one!'
  validates_length_of :password, within: 6..20, on: :create, message: 'must be between 6 and 20 characters'
  validates_length_of :bio, maximum: 200, message: 'must be less than 200 characters'
  validates_length_of :username, maximum: 50, message: 'must be less than 50 characters'
  friendly_id :username, use: :slugged
  validates :avatar, size: { less_than: 1.megabytes, message: 'must be less than 1MB (got to watch that bandwidth!)' }

  def self.find_by_credentials(identifier, password)
    user = Api::User.where(lowercase_username: identifier.downcase).or(Api::User.where(email: identifier.downcase)).first
    return nil unless user

    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    save
    self.session_token
  end

  private

  def no_at_in_username
    if username.include?('@')
      errors.add(:username, "can't have an @ symbol in it.")
    end
  end

  def downcase_email
    self.email = email.downcase if email.present?
  end
end

# frozen_string_literal: true

class Api::User < ApplicationRecord
  attr_reader :password

  validates :username, :email, :password_digest, presence: true
  validates_uniqueness_of :username, :email, on: :create, message: 'is already in use. Please use another one!'
  validates_length_of :password, within: 6..20, on: :create, message: 'must be between 6 and 20 characters'
  after_initialize :ensure_session_token

  def self.find_by_credentials(identifier, password)
    user = Api::User.where(username: identifier).or(Api::User.where(email: identifier)).first
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
end

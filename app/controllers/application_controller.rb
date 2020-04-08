# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def login!(user)
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    return nil unless session[:session_token]

    @current_user ||= Api::User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def ensure_logged_in
    if current_user.nil?
      render json: ['You must be logged in to perform this action.']
    end
  end
end

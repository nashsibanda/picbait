# frozen_string_literal: true

class Api::UsersController < ApplicationController
  before_action :ensure_logged_in, only: %i[index update destroy]
  before_action :set_user, only: %i[update destroy show]
  before_action :ensure_allowed, only: %i[update destroy]

  def index
    @users = Api::User.all
  end

  def create
    @user = Api::User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to api_user_url(@user)
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    if @user
      render :show
    else
      render json: ['User not found!'], status: 404
    end
  end

  def update
    if @user
      if @user.update(user_params)
        redirect_to api_user_url(@user)
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ['User not found!'], status: 404
    end
  end

  def destroy
    if @user
      @user.destroy
      redirect_to root_path
    else
      render json: ['User not found!'], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :lowercase_username)
  end

  def set_user
    @user = Api::User.includes(:posts).friendly.find(params[:id])
  end

  def ensure_allowed
    if @user != current_user
      render json: ['You are not authorised to perform this action.']
    end
  end
end

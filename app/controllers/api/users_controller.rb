# frozen_string_literal: true

class Api::UsersController < ApplicationController
  before_action :ensure_logged_in, only: %i[update destroy]
  before_action :set_user, only: %i[update destroy]
  before_action :ensure_allowed, only: %i[update destroy]

  def index
    if post_id
      users = logged_in? ? post_comment_users_with_current_user : post_comment_users
    elsif user_id
      users = logged_in? ? profile_follow_users_with_current_user : profile_follow_users
    end
    @users = users
  end

  def autocomplete
    users = Api::User.all.pluck(:username)
    render json: users
  end

  def create
    @user = Api::User.new(user_params)
    default_avatar = File.open('app/assets/images/default-profile-picture.png')
    processed_avatar = ImageProcessing::MiniMagick.source(default_avatar).auto_orient.resize_to_fit(600, 600).call
    @user.avatar.attach(io: processed_avatar, filename: 'default-profile-picture.png')
    if @user.save
      auto_follow_users(@user) if Api::User.count > 10
      login!(@user)
      redirect_to api_user_url(@user)
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = Api::User.includes(avatar_attachment: [:blob], posts: [:likes, image_attachment: [:blob]]).friendly.find(params[:id])
    if @user
      render :show
    else
      render json: ['User not found!'], status: 404
    end
  end

  def update
    @user = Api::User.friendly.find(params[:id])
    if @user
      @user.assign_attributes(user_params)
      if params[:user][:avatar]
        processed_avatar = ImageProcessing::MiniMagick.source(params[:user][:avatar]).auto_orient.resize_to_fit(600, 600).call
        @user.avatar.attach(io: processed_avatar, filename: "#{current_user.slug}-#{SecureRandom.uuid}.jpg")
      end
      if @user.save
        render :show
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
    params.require(:user).permit(:username, :email, :password, :lowercase_username, :avatar)
  end

  def post_comment_users
    comment_users = Api::User
                    .includes(avatar_attachment: [:blob])
                    .joins(comments: [:post])
                    .where("api_comments.api_post_id = #{post_id}")
                    .distinct

    author = Api::User
             .includes(avatar_attachment: [:blob])
             .joins(:posts)
             .where("api_posts.id = #{post_id}")
             .distinct
    (comment_users + author)
  end

  def profile_follow_users
    (profile_user_relation + user_followees + user_followers)
  end

  def profile_follow_users_with_current_user
    (profile_follow_users + current_user_relation)
  end

  def current_user_relation
    Api::User.includes(avatar_attachment: [:blob]).where(id: current_user.id)
  end

  def profile_user_relation
    Api::User.includes(avatar_attachment: [:blob]).where(slug: user_id)
  end

  def user_followers
    Api::User.includes(avatar_attachment: [:blob]).friendly.find(user_id).followers.includes(avatar_attachment: [:blob])
  end

  def user_followees
    Api::User.includes(avatar_attachment: [:blob]).friendly.find(user_id).followees.includes(avatar_attachment: [:blob])
  end

  def post_comment_users_with_current_user
    # current_user_relation = Api::User.where(id: current_user.id)
    (post_comment_users + current_user_relation)
  end

  def post_id
    params[:post_id]
  end

  def user_id
    params[:user_id]
  end

  def set_user
    @user = Api::User.friendly.find(params[:id])
  end

  def ensure_allowed
    if @user != current_user
      render json: ['You are not authorised to perform this action.']
    end
  end

  def auto_follow_users(user)
    to_follow = Api::User.all.pluck(:id).sort[1..-2].sample(5) + [1]
    to_follow.each do |to_fol|
      Api::Follow.create(follower_id: user.id, followee_id: to_fol)
    end
  end
end

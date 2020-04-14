# frozen_string_literal: true

class Api::FollowsController < ApplicationController
  before_action :ensure_logged_in, only: %i[create destroy]

  def index
    if params[:follow_type] === 'followers'
      follows = Api::User.friendly.find(params[:user_id]).in_follows
    elsif params[:follow_type] === 'followings'
      follows = Api::User.friendly.find(params[:user_id]).out_follows
    end
    @follows = follows
  end

  def show
    @follow = Api::Follow.find(params[:id])
  end

  def create
    if current_user.id != params[:user_id]
      @follow = current_user.out_follows.new(followee_id: params[:user_id])
      if @follow.save
        render @follow
      else
        render json: @follow.errors.full_messages, status: 422
      end
    else
      render json: ["Can't follow yourself!"], status: 422
    end
  end

  def destroy
    @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
    if @follow
      @follow.destroy
      render @follow
    else
      render json: ['Follow not found!'], status: 404
    end
  end
end

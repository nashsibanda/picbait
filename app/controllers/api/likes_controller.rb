# frozen_string_literal: true

class Api::LikesController < ApplicationController
  before_action :ensure_logged_in, only: %i[create destroy]

  def show
    @like = Api::Like.find(params[:id])
  end

  def create
    if comment_id
      parent = Api::Comment.find(comment_id)
    elsif post_id
      parent = Api::Post.find(post_id)
    end
    @like = Api::Like.new
    @like.api_user_id = current_user.id
    @like.likeable = parent
    if @like.save
      render @like
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Api::Like.find(params[:id])
    if @like && @like.liker == current_user
      @like.destroy
      render @like
    end
  end

  private

  def comment_id
    params[:comment_id]
  end

  def post_id
    params[:post_id]
  end
end

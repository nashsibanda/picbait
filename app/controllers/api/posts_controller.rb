# frozen_string_literal: true

class Api::PostsController < ApplicationController
  before_action :find_post, except: %i[index create]
  before_action :ensure_allowed, only: %i[update destroy]

  def index
    posts = user_id ? Api::Post.where(api_user_id: user_id) : Api::Post.all
    @posts = posts
    render :index
  end

  def show; end

  def create
    @post = Api::Post.new(post_params)
    if @post.save
      render @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    if @post
      if @post.update(post_params)
        render @post
      else
        render json: @post.errors.full_messages, status: 422
      end
    else
      render json: ['Post not found!'], status: 404
    end
  end

  def destroy
    if @post
      @post.destroy
      render @post
    else
      render json: ['Post not found!'], status: 404
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :image, :api_user_id)
  end

  def user_id
    post_user = Api::User.friendly.find(params[:user_id])
    post_user.id
  end

  def find_post
    @post = Api::Post.includes(:author).find_by(id: params[:id])
  end

  def ensure_allowed
    if @post.author != current_user
      render json: ['You are not authorised to perform this action.']
    end
  end
end

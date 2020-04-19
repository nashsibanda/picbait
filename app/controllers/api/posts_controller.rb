# frozen_string_literal: true

class Api::PostsController < ApplicationController
  before_action :find_post, except: %i[index create]
  before_action :ensure_allowed, only: %i[update destroy]

  def index
    if page
      posts = user_id ? Api::Post.includes(:likes, image_attachment: [:blob]).where(api_user_id: user_id).order(created_at: :desc).page(page) : current_user.feed_posts.includes(:likes, image_attachment: [:blob]).order(created_at: :desc).page(page)
    else
      posts = user_id ? Api::Post.includes(:likes, image_attachment: [:blob]).where(api_user_id: user_id).order(created_at: :desc) : current_user.feed_posts.includes(:likes, image_attachment: [:blob]).order(created_at: :desc)
    end
    @posts = posts
    render :index
  end

  def show; end

  def create
    @post = Api::Post.new(post_params)
    processed_image = ImageProcessing::MiniMagick.source(params[:post][:image]).auto_orient.resize_to_fit(1200, 1200).call
    @post.image.attach(io: processed_image, filename: "#{current_user.slug}-#{SecureRandom.uuid}.jpg")
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
    if params[:user_id]
      post_user = Api::User.friendly.find(params[:user_id])
      post_user.id
    else
      false
    end
  end

  def page
    params[:page]
  end

  def find_post
    @post = Api::Post.includes(:author, :likes, image_attachment: [:blob]).find_by(id: params[:id])
  end

  def ensure_allowed
    if @post.author != current_user
      render json: ['You are not authorised to perform this action.']
    end
  end
end

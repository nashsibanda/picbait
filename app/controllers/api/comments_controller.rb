# frozen_string_literal: true

class Api::CommentsController < ApplicationController
  before_action :find_comment, except: %i[index new create]

  def index
    comments = post_id ? Api::Comment.where(parent_comment_id: nil).where(api_post_id: post_id) : Api::Comment.where(parent_comment_id: nil).all
    @comments = comments
    render :index
  end

  def show; end

  def create
    @comment = Api::Comment.new(params[:comment])
    if @comment.save
      render @comment
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    if @comment
      if @comment.update_attributes(params[:comment])
        redirect_to @comment
      else
        render json: @comment.errors.full_messages, status: 422
      end
    else
      render json: ['Comment not found!'], status: 404
    end
  end

  def destroy
    if @comment
      @comment.destroy
      render @comment
    else
      render json: ['Comment not found!'], status: 404
    end
  end

  private

  def post_id
    params[:post_id]
  end

  def find_comment
    @comment = Api::Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body, :api_user_id, :api_post_id, :parent_comment_id)
  end
end

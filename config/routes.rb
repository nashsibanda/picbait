# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :posts, only: %i[create show update destroy] do
      resources :comments, only: :index
    end
    resources :comments, only: %i[create update show destroy]
    resources :users, only: %i[index create show update destroy] do
      resources :posts, only: :index
    end
    resource :session, only: %i[create destroy]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

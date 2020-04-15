# frozen_string_literal: true

module Likeable
  extend ActiveSupport::Concern

  included do
    has_many :likes, class_name: 'Api::Like', as: :likeable, dependent: :destroy
  end
end

# frozen_string_literal: true

show_bio ||= false
json.extract! user, :username, :email, :id
json.bio user.bio if show_bio

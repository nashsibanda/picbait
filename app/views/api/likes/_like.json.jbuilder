# frozen_string_literal: true

json.extract! like, :id, :api_user_id, :likeable_type, :likeable_id
json.likerSlug like.liker.slug

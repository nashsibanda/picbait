# frozen_string_literal: true

json.extract! follow, :id, :followee_id, :follower_id
json.follower follow.follower.slug
json.followee follow.followee.slug

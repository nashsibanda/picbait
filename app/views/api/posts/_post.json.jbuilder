# frozen_string_literal: true

json.extract! post, :id, :title, :description
json.author_id post.author.id

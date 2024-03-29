# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_28_211112) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", precision: nil, null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "api_comments", force: :cascade do |t|
    t.string "body", null: false
    t.integer "parent_comment_id"
    t.bigint "api_user_id"
    t.bigint "api_post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_post_id"], name: "index_api_comments_on_api_post_id"
    t.index ["api_user_id"], name: "index_api_comments_on_api_user_id"
  end

  create_table "api_follows", force: :cascade do |t|
    t.bigint "follower_id", null: false
    t.bigint "followee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followee_id", "follower_id"], name: "index_api_follows_on_followee_id_and_follower_id", unique: true
    t.index ["followee_id"], name: "index_api_follows_on_followee_id"
    t.index ["follower_id"], name: "index_api_follows_on_follower_id"
  end

  create_table "api_likes", force: :cascade do |t|
    t.bigint "api_user_id"
    t.string "likeable_type"
    t.bigint "likeable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_user_id"], name: "index_api_likes_on_api_user_id"
    t.index ["likeable_type", "likeable_id"], name: "index_api_likes_on_likeable_type_and_likeable_id"
  end

  create_table "api_posts", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.bigint "api_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_user_id"], name: "index_api_posts_on_api_user_id"
    t.index ["title"], name: "index_api_posts_on_title"
  end

  create_table "api_users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "bio"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "lowercase_username", null: false
    t.string "slug"
    t.index ["email"], name: "index_api_users_on_email", unique: true
    t.index ["lowercase_username"], name: "index_api_users_on_lowercase_username", unique: true
    t.index ["session_token"], name: "index_api_users_on_session_token", unique: true
    t.index ["slug"], name: "index_api_users_on_slug", unique: true
    t.index ["username"], name: "index_api_users_on_username", unique: true
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at", precision: nil
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "api_comments", "api_posts"
  add_foreign_key "api_comments", "api_users"
  add_foreign_key "api_likes", "api_users"
  add_foreign_key "api_posts", "api_users"
end

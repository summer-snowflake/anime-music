# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170910082027) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actors", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
  end

  create_table "admins", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "advertisements", id: :serial, force: :cascade do |t|
    t.integer "anime_id"
    t.integer "actor_id"
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "season_id"
    t.bigint "melody_id"
    t.string "tag_name"
    t.index ["actor_id"], name: "index_advertisements_on_actor_id"
    t.index ["anime_id"], name: "index_advertisements_on_anime_id"
    t.index ["melody_id"], name: "index_advertisements_on_melody_id"
    t.index ["season_id"], name: "index_advertisements_on_season_id"
  end

  create_table "animes", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.text "summary", default: "", null: false
    t.text "wiki_url"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
  end

  create_table "appearances", id: :serial, force: :cascade do |t|
    t.integer "anime_id", null: false
    t.integer "actor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
    t.index ["actor_id"], name: "index_appearances_on_actor_id"
    t.index ["anime_id"], name: "index_appearances_on_anime_id"
  end

  create_table "melodies", id: :serial, force: :cascade do |t|
    t.integer "anime_id"
    t.integer "season_id"
    t.integer "kind", null: false
    t.string "title", null: false
    t.integer "singer_id"
    t.string "music"
    t.string "lyric_writer"
    t.string "composer"
    t.string "adapter"
    t.text "memo"
    t.date "start_on"
    t.date "end_on"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "youtube"
    t.boolean "draft", default: false, null: false
    t.integer "created_by"
    t.integer "updated_by"
    t.index ["anime_id"], name: "index_melodies_on_anime_id"
    t.index ["season_id"], name: "index_melodies_on_season_id"
    t.index ["singer_id"], name: "index_melodies_on_singer_id"
  end

  create_table "melody_images", force: :cascade do |t|
    t.bigint "melody_id", null: false
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["melody_id"], name: "index_melody_images_on_melody_id"
  end

  create_table "seasons", id: :serial, force: :cascade do |t|
    t.integer "anime_id", null: false
    t.string "behind_name"
    t.date "start_on"
    t.date "end_on"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "phase", default: 0
    t.boolean "disabled", default: false, null: false
    t.string "previous_name"
    t.integer "created_by"
    t.integer "updated_by"
  end

  create_table "singers", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
  end

  create_table "tagged_seasons", force: :cascade do |t|
    t.integer "season_id", null: false
    t.integer "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by"
    t.integer "updated_by"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type", default: "", null: false
    t.integer "created_by"
    t.integer "updated_by"
    t.index ["type"], name: "index_tags_on_type"
  end

  create_table "tokens", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "tokenizable_type", null: false
    t.integer "tokenizable_id", null: false
    t.string "token", null: false
    t.text "data"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.index ["expires_at"], name: "index_tokens_on_expires_at"
    t.index ["token"], name: "index_tokens_on_token"
    t.index ["tokenizable_id", "tokenizable_type", "name"], name: "index_tokens_on_tokenizable_id_and_tokenizable_type_and_name", unique: true
    t.index ["tokenizable_type", "tokenizable_id"], name: "index_tokens_on_tokenizable_type_and_tokenizable_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "advertisements", "melodies"
  add_foreign_key "advertisements", "seasons"
end

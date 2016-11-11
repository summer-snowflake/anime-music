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

ActiveRecord::Schema.define(version: 20161105150204) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actors", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "advertisements", force: :cascade do |t|
    t.integer  "anime_id"
    t.integer  "actor_id"
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actor_id"], name: "index_advertisements_on_actor_id", using: :btree
    t.index ["anime_id"], name: "index_advertisements_on_anime_id", using: :btree
  end

  create_table "animes", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "summary"
    t.string   "wiki_url"
    t.string   "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "appearances", force: :cascade do |t|
    t.integer  "anime_id",   null: false
    t.integer  "actor_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actor_id"], name: "index_appearances_on_actor_id", using: :btree
    t.index ["anime_id"], name: "index_appearances_on_anime_id", using: :btree
  end

  create_table "melodies", force: :cascade do |t|
    t.integer  "anime_id"
    t.integer  "season_id"
    t.integer  "kind",         null: false
    t.string   "title",        null: false
    t.integer  "singer_id"
    t.string   "music"
    t.string   "lyric_writer"
    t.string   "composer"
    t.string   "adapter"
    t.text     "memo"
    t.date     "start_on"
    t.date     "end_on"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["anime_id"], name: "index_melodies_on_anime_id", using: :btree
    t.index ["season_id"], name: "index_melodies_on_season_id", using: :btree
    t.index ["singer_id"], name: "index_melodies_on_singer_id", using: :btree
  end

  create_table "seasons", force: :cascade do |t|
    t.integer  "anime_id",   null: false
    t.string   "name",       null: false
    t.date     "start_on"
    t.date     "end_on"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "singers", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

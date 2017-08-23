# frozen_string_literal: true

require 'csv'
include ActionDispatch::TestProcess

module SampleGenerator
  # 管理者ユーザの登録
  def create_admin_user
    if Admin.count.zero?
      user = FactoryGirl.create(:user, :registered, :admin_user)
      puts "Create Admin User { email: #{user.email}, password: 'password' }"
    else
      puts "Already exists Admin User { email: #{Admin.first.user.email} }"
    end
  end

  # アニメの登録
  def create_animes
    CSV.foreach(Rails.root.join('db', 'data', 'animes.csv').to_s) do |row|
      create_anime(row)
    end
  end

  # シーズンの登録
  def create_seasons
    CSV.foreach(Rails.root.join('db', 'data', 'seasons.csv').to_s) do |row|
      create_season(row)
    end
  end

  # 歌手の登録
  def create_singers
    CSV.foreach(Rails.root.join('db', 'data', 'singers.csv').to_s) do |row|
      create_singer(row)
    end
  end

  # 曲の登録
  def create_melodies
    CSV.foreach(Rails.root.join('db', 'data', 'melodies.csv').to_s) do |row|
      create_melody(row)
    end
  end

  # 声優の登録
  def create_actors
    anime = Anime.first
    return if anime.actors.count > 3

    3.times do
      actor = FactoryGirl.create!(:actor)
      FactoryGirl.create(:appearance, anime: anime, actor: actor)
      puts "Create/Update Actor { name: #{actor.name}}"
    end
  end

  # 広告の登録
  def create_advertisements
    anime = Anime.first
    melody = anime.melodies.first

    3.times do
      create_anime_advertisement(anime)
      create_melody_advertisement(melody)
    end
  end

  private

  def create_anime(row)
    file_mime_type = 'image/' + File.extname(row[3])[1..-1]
    attrs = {
      title: row[0], summary: row[1], wiki_url: row[2],
      picture: fixture_file_upload('spec/fixtures/' + row[3], file_mime_type)
    }
    anime = Anime.find_or_initialize_by(title: attrs[:title])
    anime.attributes = attrs

    # NOTE: fixture_file_uploadにより、必ずchanged?はtrueになる
    # return unless anime.changed?

    anime.save!
    puts "Create/Update Anime { id: #{anime.id}, title: #{anime.title}}"
  end

  def create_season(row)
    attrs = { phase: row[1], previous_name: row[2], behind_name: row[3],
              start_on: row[4], end_on: row[5], disabled: row[6] }
    anime = Anime.find_or_initialize_by(title: row[0])
    season = anime.seasons.find_or_initialize_by(phase: attrs[:phase])
    season.attributes = attrs
    return unless season.changed?

    season.save!
    puts "Create/Update Anime Season \
      { id: #{season.id}, title: #{anime.title}, phase: 第#{season.phase}期}"
  end

  def create_singer(row)
    attrs = { name: row[0] }
    singer = Singer.find_or_initialize_by(name: row[0])
    singer.attributes = attrs
    return unless singer.changed?

    singer.save!
    puts "Create/Update Singer { name: #{singer.name} }"
  end

  def create_melody(row)
    anime = Anime.find_or_initialize_by(title: row[0])
    season = anime.seasons.find_or_initialize_by(phase: row[1])
    singer = Singer.find_or_create_by(name: row[2])

    attrs = { title: row[3], singer_id: singer.id, kind: row[4], memo: row[8],
              lyric_writer: row[5], composer: row[6], adapter: row[7] }
    melody = Melody.find_by(season: season)
    melody.attributes = attrs
    return unless melody.changed?

    melody.save!
    puts "Create/Update Melody { title: #{melody.title} }"
  end

  def create_anime_advertisement(anime)
    return if anime.advertisements.count > 3

    advertisement = anime.advertisements
                         .create!(body: '<a href="http://amzn.to/2nzyIRy" />')
    puts "Create/Update Advertisement \
      { id: #{advertisement.id}, anime: #{anime.title} }"
  end

  def create_melody_advertisement(melody)
    return if melody.advertisements.count > 3

    advertisement = melody.advertisements
                          .create!(body: '<a href="http://amzn.to/2g2ETyN" />')
    puts "Create/Update Advertisement \
      { id: #{advertisement.id}, melody: #{melody.title} }"
  end
end

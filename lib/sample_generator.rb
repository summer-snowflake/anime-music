# frozen_string_literal: true

require 'csv'
include ActionDispatch::TestProcess

module SampleGenerator
  # 管理者ユーザの登録
  def create_admin_user
    if Admin.count.zero?
      user = FactoryBot.create(:user, :registered, :admin_user)
      puts "Create Admin User { email: #{user.email}, password: 'password' }"
    else
      puts "Already exists Admin User { email: #{Admin.first.user.email} }"
    end
  end

  # アニメ、シーズン、歌手、曲の登録
  def create_from_csv(target_object)
    file_path = Rails.root.join('db', 'data', "#{target_object}.csv")
    CSV.foreach(file_path.to_s) do |row|
      send("create_#{target_object.singularize}", row)
    end
  end

  # 声優の登録
  def create_actors
    anime = Anime.first_or_create!(title: 'アニメタイトル')
    return if Actor.count > 3

    3.times do
      actor = FactoryBot.create(:actor)
      FactoryBot.create(:appearance, anime: anime, actor: actor)
      puts "Create/Update Actor { name: #{actor.name}}"
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

    anime.save! && create_advertisement(anime)
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

  def build_melody(row)
    anime = Anime.find_or_create_by!(title: row[0])
    season = anime.seasons.find_or_create_by!(phase: row[1])
    singer = Singer.find_or_create_by!(name: row[2])

    attrs = { title: row[3], singer_id: singer.id, kind: row[4], memo: row[8],
              lyric_writer: row[5], composer: row[6], adapter: row[7] }
    melody = season.melodies.new
    melody.attributes = attrs
    melody
  end

  def create_melody(row)
    melody = build_melody(row)
    return unless melody.changed?

    melody.save! && create_advertisement(melody)
    puts "Create/Update Melody { id: #{melody.id}, title: #{melody.title} }"
  end

  def create_advertisement(target)
    return if target.advertisements.count > 3

    advertisement = target.advertisements
                          .create!(body: '<a href="http://amzn.to/2nzyIRy" />')
    puts "Create/Update Advertisement \
      { id: #{advertisement.id}, class: #{target.class} }"
  end
end

# frozen_string_literal: true

require 'csv'
include ActionDispatch::TestProcess

module SampleGenerator
  def create_admin_user
    if Admin.count.zero?
      user = FactoryGirl.create(:user, :registered, :admin_user)
      puts "Create Admin User { email: #{user.email}, password: 'password' }"
    else
      puts "Already exists Admin User { email: #{Admin.first.user.email} }"
    end
  end

  def create_animes
    CSV.foreach(Rails.root.join('db', 'data', 'animes.csv').to_s) do |row|
      create_anime(row)
    end
  end

  def create_seasons
    CSV.foreach(Rails.root.join('db', 'data', 'seasons.csv').to_s) do |row|
      create_season(row)
    end
  end

  def create_melody1
    @anime = Anime.first
    singer1 = FactoryGirl.create(:singer, name: '喜多修平')
    season1 = @anime.seasons.first

    FactoryGirl.create(
      :melody, anime: @anime, season: season1, singer: singer1, kind: :op,
               title: '一斉の声', lyric_writer: '椎名慶治', composer: 'TAKUYA',
               adapter: 'TAKUYA, h-wonder', memo: ''
    )
  end

  def create_melody2
    @anime = Anime.first
    singer2 = FactoryGirl.create(:singer, name: 'Aimer')
    season5 = @anime.seasons.fifth

    FactoryGirl.create(
      :melody,
      anime: @anime, season: season5, singer: singer2, kind: :ed,
      title: '茜さす', lyric_writer: 'aimerrhythm', composer: '釣俊輔',
      adapter: '玉井健二, 釣俊輔', memo: ''
    )
  end

  def create_appearances
    @anime = Anime.first
    actor1 = FactoryGirl.create(:actor)
    actor2 = FactoryGirl.create(:actor)
    FactoryGirl.create(:appearance, anime: @anime, actor: actor1)
    FactoryGirl.create(:appearance, anime: @anime, actor: actor2)
  end

  def create_advertisements
    @anime = Anime.first
    FactoryGirl.create(
      :advertisement,
      anime: @anime, actor: nil, body: '<a href="http://amzn.to/2nzyIRy" />'
    )
    FactoryGirl.create(
      :advertisement,
      anime: @anime, actor: nil, body: '<a href="http://amzn.to/2nzyIRy" />'
    )
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
end

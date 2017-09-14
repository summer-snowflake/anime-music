# frozen_string_literal: true

json.animes do
  json.array! @animes do |anime|
    json.id anime.id
    json.status_name anime.decorate.human_status_name
    json.title anime.title
    json.picture anime.picture.url
    json.airing anime.airing?
    json.seasons anime.seasons do |season|
      json.id season.id
      json.anime_title season.decorate.anime_title
      json.melodies season.melodies do |melody|
        json.id melody.id
        json.title melody.title
        json.kind melody.kind
        json.draft melody.draft
      end
    end
  end
end

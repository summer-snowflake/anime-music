# frozen_string_literal: true

json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.anime_title season.decorate.anime_title
    json.anime do |json|
      json.id season.anime.id
      json.summary season.anime.summary
      json.thumbnail season.anime.picture.url
    end
    json.melodies season.melodies do |melody|
      json.id melody.id
      json.kind melody.kind
      json.title melody.title
      json.youtube melody.youtube.try!(:html_safe)
      json.advertisement_body melody.advertisement.try!(:body)
      json.info melody.decorate.info.html_safe
    end
  end
end

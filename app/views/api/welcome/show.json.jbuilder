# frozen_string_literal: true

json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.phase season.phase
    json.name season.name
    json.thumbnail season.anime.picture.url
    json.anime season.anime, :id, :title, :summary
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

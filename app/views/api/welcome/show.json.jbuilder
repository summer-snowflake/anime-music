# frozen_string_literal: true

json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.phase season.phase
    json.name season.name
    json.anime season.anime, :id, :title, :summary
    json.melodies season.melodies do |melody|
      json.id melody.id
      json.kind melody.kind
      json.title melody.title
    end
    json.movies season.movies do |movie|
      json.melody_id movie.id
      json.youtube movie.youtube
    end
  end
end

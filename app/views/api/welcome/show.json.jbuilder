# frozen_string_literal: true

json.animes do
  json.array! @seasons do |season|
    json.id season.anime.id
    json.title season.anime.title
    json.summary season.anime.summary
  end
end

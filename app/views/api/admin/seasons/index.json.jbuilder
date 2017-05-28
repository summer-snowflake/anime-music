# frozen_string_literal: true

json.anime_title @anime.title
json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.anime_id season.anime_id
    json.anime_title season.decorate.anime_title
    json.phase season.phase
    json.name season.name
    json.disabled season.disabled
    json.start_on season.start_on
    json.end_on season.end_on
    json.period season.decorate.period
  end
end

# frozen_string_literal: true

json.advertisements do
  json.array! @advertisements do |advertisement|
    json.id advertisement.id
    json.anime_id advertisement.anime_id
    json.season_id advertisement.season_id
    json.season_phase advertisement.season.try!(:phase)
    json.body advertisement.body.html_safe
  end
end

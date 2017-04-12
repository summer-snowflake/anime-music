# frozen_string_literal: true

json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.phase season.phase
    json.name season.name
    json.anime season.anime, :id, :title, :summary
  end
end

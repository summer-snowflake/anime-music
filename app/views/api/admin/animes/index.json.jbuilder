# frozen_string_literal: true

json.animes do
  json.array! @animes do |anime|
    json.id anime.id
    json.title anime.title
    json.picture anime.picture.url
    json.airing anime.airing?
  end
end

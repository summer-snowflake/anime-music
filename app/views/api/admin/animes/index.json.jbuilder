json.animes do
  json.array! @animes do |anime|
    json.id anime.id
    json.title anime.title
    json.summary anime.summary
    json.wiki_url anime.wiki_url
    json.picture anime.picture
  end
end

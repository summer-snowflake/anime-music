json.id @anime.id
json.title @anime.title
json.summary @anime.summary
json.wiki_url @anime.wiki_url
json.picture @anime.picture

json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.phase season.phase
    json.name season.name
    json.start_on season.start_on
    json.end_on season.end_on
  end
end

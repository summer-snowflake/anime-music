json.seasons do
  json.array! @seasons do |season|
    json.id season.id
    json.phase season.phase
    json.name season.name
    json.start_on season.start_on
    json.end_on season.end_on
    json.period season.decorate.period
  end
end

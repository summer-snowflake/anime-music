json.actors do
  json.array! @actors do |actor|
    json.id actor.id
    json.name actor.name
  end
end

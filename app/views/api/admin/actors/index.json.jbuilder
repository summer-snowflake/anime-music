# frozen_string_literal: true

json.actors do
  json.array! @actors do |actor|
    json.id actor.id
    json.name actor.name
  end
end

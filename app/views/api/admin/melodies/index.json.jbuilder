# frozen_string_literal: true

json.melodies do
  json.array! @melodies do |melody|
    json.id melody.id
    json.title melody.title
    json.kind melody.kind
  end
end

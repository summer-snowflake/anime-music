# frozen_string_literal: true

json.melody_images do
  json.array! @melody_images do |image|
    json.id image.id
    json.picture image.picture.url
  end
end

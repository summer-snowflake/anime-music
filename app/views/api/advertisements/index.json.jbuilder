# frozen_string_literal: true

json.advertisements do
  json.array! @advertisements do |advertisement|
    json.id advertisement.id
    json.body advertisement.body.html_safe
    json.tag_name advertisement.tag_name
  end
end

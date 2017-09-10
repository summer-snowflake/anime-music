# frozen_string_literal: true

json.anime_logs do
  json.array! @anime_logs do |anime_log|
    json.id anime_log.id
    json.event anime_log.event
    json.item_title anime_log.item.title
    json.operator anime_log.item.updator
    json.object_changes anime_log.object_changes
  end
end

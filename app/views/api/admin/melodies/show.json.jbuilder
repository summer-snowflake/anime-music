# frozen_string_literal: true

json.id @melody.id
json.season_anime_title @melody.season.decorate.anime_title
json.kind @melody.kind
json.title @melody.title
json.youtube @melody.youtube
json.singer_name @melody.singer.name
json.lyric_writer @melody.lyric_writer
json.composer @melody.composer
json.adapter @melody.adapter
json.info @melody.decorate.info.html_safe
json.memo @melody.memo
json.advertisements @melody.advertisements do |advertisement|
  json.id advertisement.id
  json.body advertisement.body
end
json.draft @melody.draft
json.melody_images @melody.melody_images do |melody_image|
  json.id melody_image.id
  json.picture melody_image.picture.url
end

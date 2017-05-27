# frozen_string_literal: true

json.melodies do
  json.array! @melodies do |melody|
    json.id melody.id
    json.season_id melody.season.id
    json.title melody.title
    json.singer_name melody.singer.try!(:name)
    json.lyric_writer melody.lyric_writer
    json.composer melody.composer
    json.adapter melody.adapter
    json.memo melody.memo
    json.kind melody.kind
    json.youtube melody.youtube.try!(:html_safe)
    json.advertisement_id melody.advertisement.try!(:id)
    json.advertisement_body melody.advertisement.try!(:body).try!(:html_safe)
    json.melody_images melody.melody_images do |image|
      json.id image.id
      json.picture image.picture.url
    end
  end
end

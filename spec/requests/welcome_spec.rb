# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/welcome', autodoc: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1) }
  let!(:season2) { create(:season, anime: anime2) }
  let!(:melody1) { create(:melody, season: season1) }
  let!(:melody2) { create(:melody, season: season2) }
  let!(:advertisement) { create(:advertisement, anime: anime1) }
  let!(:melody_advertisement) { create(:advertisement, melody: melody1) }

  it '200とアニメ一覧が返ってくること' do
    get '/api/welcome'
    expect(response.status).to eq 200

    json = {
      seasons: [
        {
          id: season1.id,
          phase: season1.phase,
          name: season1.name,
          anime: {
            id: anime1.id,
            title: anime1.title,
            summary: anime1.summary,
            thumbnail: nil
          },
          melodies: [
            {
              id: melody1.id,
              kind: melody1.kind,
              title: melody1.title,
              youtube: melody1.youtube,
              advertisement_body: melody1.advertisement.body,
              info: "歌: #{melody1.singer.name}<br />" \
                "作詞: #{melody1.lyric_writer}<br />" \
                "作曲: #{melody1.composer}<br />編曲: #{melody1.adapter}<br />"
            }
          ],
          advertisements: [
            {
              id: advertisement.id,
              body: advertisement.body
            }
          ]
        },
        {
          id: season2.id,
          phase: season2.phase,
          name: season2.name,
          anime: {
            id: anime2.id,
            title: anime2.title,
            summary: anime2.summary,
            thumbnail: nil
          },
          melodies: [
            {
              id: melody2.id,
              kind: melody2.kind,
              title: melody2.title,
              youtube: melody2.youtube,
              advertisement_body: nil,
              info: "歌: #{melody2.singer.name}<br />" \
                "作詞: #{melody2.lyric_writer}<br />" \
                "作曲: #{melody2.composer}<br />編曲: #{melody2.adapter}<br />"
            }
          ],
          advertisements: []
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/welcome', autodoc: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1) }
  let!(:season2) { create(:season, anime: anime2) }
  let!(:melody1) { create(:melody, season: season1) }
  let!(:melody2) { create(:melody, season: season2) }
  let!(:melody3) { create(:melody, season: season2, draft: true) }
  let!(:advertisement) { create(:advertisement, anime: anime1) }
  let!(:melody_advertisement) do
    create(:advertisement, :blongs_to_melody, melody: melody1)
  end

  it '200とアニメ一覧が返ってくること' do
    get '/api/welcome'
    expect(response.status).to eq 200

    json = {
      seasons: [
        {
          id: season1.id,
          anime_title: season1.decorate.anime_title,
          anime: {
            id: anime1.id,
            summary: anime1.summary,
            thumbnail: anime1.picture.url
          },
          melodies: [
            {
              id: melody1.id,
              kind: melody1.kind,
              title: melody1.title,
              youtube: melody1.youtube,
              comment: melody1.memo,
              advertisements: [
                {
                  body: melody_advertisement.body
                }
              ],
              info: "歌: #{melody1.singer.name}<br />" \
                "作詞: #{melody1.lyric_writer}<br />" \
                "作曲: #{melody1.composer}<br />編曲: #{melody1.adapter}<br />"
            }
          ]
        },
        {
          id: season2.id,
          anime_title: season2.decorate.anime_title,
          anime: {
            id: anime2.id,
            summary: anime2.summary,
            thumbnail: anime2.picture.url
          },
          melodies: [
            {
              id: melody2.id,
              kind: melody2.kind,
              title: melody2.title,
              youtube: melody2.youtube,
              comment: melody2.memo,
              advertisements: [],
              info: "歌: #{melody2.singer.name}<br />" \
                "作詞: #{melody2.lyric_writer}<br />" \
                "作曲: #{melody2.composer}<br />編曲: #{melody2.adapter}<br />"
            }
          ]
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

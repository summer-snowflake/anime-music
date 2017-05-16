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
            summary: anime1.summary
          },
          melodies: [
            {
              id: melody1.id,
              kind: melody1.kind,
              title: melody1.title
            }
          ],
          movies: [
            {
              melody_id: melody1.id,
              youtube: melody1.youtube,
              advertisement_body: melody_advertisement.body
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
            summary: anime2.summary
          },
          melodies: [
            {
              id: melody2.id,
              kind: melody2.kind,
              title: melody2.title
            }
          ],
          movies: [
            {
              melody_id: melody2.id,
              youtube: melody2.youtube,
              advertisement_body: nil
            }
          ],
          advertisements: []
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

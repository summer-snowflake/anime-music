# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/welcome', autodoc: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1) }
  let!(:season2) { create(:season, anime: anime2) }

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
          }
        },
        {
          id: season2.id,
          phase: season2.phase,
          name: season2.name,
          anime: {
            id: anime2.id,
            title: anime2.title,
            summary: anime2.summary
          }
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

# frozen_string_literal: true
require 'rails_helper'

describe 'GET /api/admin/animes/1/seasons', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime) }
  let!(:season2) { create(:season, anime: anime) }

  it '200とアニメ一覧が返ってくること' do
    get "/api/admin/animes/#{anime.id}/seasons"
    expect(response.status).to eq 200

    json = {
      seasons: [
        {
          id: season1.id,
          phase: season1.phase,
          name: season1.name,
          start_on: season1.start_on.strftime('%Y-%m-%d'),
          end_on: season1.end_on.try(:strftime, '%Y-%m-%d')
        },
        {
          id: season2.id,
          phase: season2.phase,
          name: season2.name,
          start_on: season2.start_on.strftime('%Y-%m-%d'),
          end_on: season2.end_on.try(:strftime, '%Y-%m-%d')
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end
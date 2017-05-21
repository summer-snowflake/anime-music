# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/seasons/:season_id/advertisements', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }
  let!(:advertisement1) { create(:advertisement, anime: anime) }
  let!(:advertisement2) { create(:advertisement, anime: anime) }

  context 'ログインしていない場合' do
    it '200とデータが返ってくること' do
      get "/api/seasons/#{season.id}/advertisements"
      expect(response.status).to eq 200

      json = {
        advertisements: [
          {
            id: advertisement1.id,
            body: advertisement1.body
          },
          {
            id: advertisement2.id,
            body: advertisement2.body
          }
        ]
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'GET /api/advertisements', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }
  let!(:advertisement1) { create(:advertisement, anime: anime) }
  let!(:advertisement2) { create(:advertisement, anime: anime) }

  context 'ログインしていない場合' do
    it '200とデータが返ってくること' do
      get "/api/advertisements"
      expect(response.status).to eq 200

      json = {
        advertisements: contain_exactly(
          {
            id: advertisement1.id,
            body: advertisement1.body
          },
          {
            id: advertisement2.id,
            body: advertisement2.body
          }
        )
      }
      json = JSON.parse(response.body)
      expect(response.body).to be_json_as(json)
    end
  end
end

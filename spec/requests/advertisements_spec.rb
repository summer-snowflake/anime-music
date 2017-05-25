# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/seasons/:season_id/advertisements', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }
  let!(:advertisement) { create(:advertisement, anime: anime) }

  context 'ログインしていない場合' do
    it '200とデータが返ってくること' do
      get "/api/seasons/#{season.id}/advertisements"
      expect(response.status).to eq 200

      json = {
        advertisements: [
          {
            id: advertisement.id,
            body: advertisement.body,
            tag_name: advertisement.tag_name
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
  let!(:advertisement) { create(:advertisement, anime: anime) }

  context 'ログインしていない場合' do
    it '200とデータが返ってくること' do
      get '/api/advertisements'
      expect(response.status).to eq 200

      json = {
        advertisements: [
          {
            id: advertisement.id,
            body: advertisement.body,
            tag_name: advertisement.tag_name
          }
        ]
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

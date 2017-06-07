# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/animes/:anime_id/advertisements', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:advertisement) { create(:advertisement, anime: anime) }

  context 'ログインしていない場合' do
    it '200とデータが返ってくること' do
      get "/api/animes/#{anime.id}/advertisements"
      expect(response.status).to eq 200

      json = {
        id: advertisement.id,
        body: advertisement.body,
        tag_name: advertisement.tag_name
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
        id: advertisement.id,
        body: advertisement.body,
        tag_name: advertisement.tag_name
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

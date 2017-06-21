# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/animes/:anime_id', autodoc: true do
  let!(:anime) { create(:anime) }

  context 'ログインしていない場合' do
    it '200とデータが返ってくること' do
      get "/api/animes/#{anime.id}"
      expect(response.status).to eq 200

      json = {
        id: anime.id,
        title: anime.title,
        summary: anime.summary,
        thumbnail: anime.picture.url
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

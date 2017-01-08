# frozen_string_literal: true
require 'rails_helper'

describe 'GET /api/admin/animes', autodoc: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  it '200とアニメ一覧が返ってくること' do
    get '/api/admin/animes'
    expect(response.status).to eq 200

    json = {
      animes: [
        {
          id: anime1.id,
          title: anime1.title,
          summary: anime1.summary,
          wiki_url: anime1.wiki_url
        },
        {
          id: anime2.id,
          title: anime2.title,
          summary: anime2.summary,
          wiki_url: anime2.wiki_url
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

describe 'GET /api/admin/animes/:id', autodoc: true do
  let!(:anime) { create(:anime) }

  it '200とアニメ詳細が返ってくること' do
    get "/api/admin/animes/#{anime.id}"
    expect(response.status).to eq 200

    json = {
      id: anime.id,
      title: anime.title,
      summary: anime.summary,
      wiki_url: anime.wiki_url
    }
    expect(response.body).to be_json_as(json)
  end
end

describe 'PATCH /api/admin/animes/:id' do
  let!(:anime) { create(:anime) }
  let!(:title) { 'タイトル' }
  let!(:params) { { anime: { id: anime.id, title: title } } }

  context '値が空の場合' do
    let(:title) { '' }

    it '422とエラーメッセージが返ってくること' do
      patch "/api/admin/animes/#{anime.id}", params: params
      expect(response.status).to eq 422

      json = {
        error_messages: ['タイトルを入力してください']
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'タイトルが正常値の場合' do
    it '200が返ってくること' do
      patch "/api/admin/animes/#{anime.id}", params: params
      expect(response.status).to eq 200
    end
  end
end

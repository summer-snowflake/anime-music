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
          wiki_url: anime1.wiki_url,
          picture: anime1.picture
        },
        {
          id: anime2.id,
          title: anime2.title,
          summary: anime2.summary,
          wiki_url: anime2.wiki_url,
          picture: anime2.picture
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

describe 'GET /api/admin/animes/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime) }
  let!(:season2) { create(:season, anime: anime) }

  it '200とアニメ詳細が返ってくること' do
    get "/api/admin/animes/#{anime.id}"
    expect(response.status).to eq 200

    json = {
      id: anime.id,
      title: anime.title,
      summary: anime.summary,
      wiki_url: anime.wiki_url,
      picture: anime.picture,
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

describe 'PATCH /api/admin/animes/:id' do
  let!(:anime) { create(:anime) }

  context 'タイトルの変更' do
    let!(:params) { { anime: { id: anime.id, title: title } } }
    let!(:title) { 'タイトル' }
    context 'タイトルが空の場合' do
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

  context 'サマリとwiki URLの変更' do
    let!(:params) do
      { anime: { id: anime.id, summary: 'アニメサマリ', wiki_url: 'wiki_url' } }
    end

    it '200が返ってくること' do
      patch "/api/admin/animes/#{anime.id}", params: params
      expect(response.status).to eq 200
    end
  end
end

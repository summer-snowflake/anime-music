# frozen_string_literal: true
require 'rails_helper'

describe 'GET /api/admin/animes/1/seasons', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime).decorate }
  let!(:season2) { create(:season, anime: anime).decorate }

  it '200とアニメ一覧が返ってくること' do
    get "/api/admin/animes/#{anime.id}/seasons"
    expect(response.status).to eq 200

    json = {
      seasons: [
        {
          id: season1.id,
          anime_id: season1.anime_id,
          phase: season1.phase,
          name: season1.name,
          start_on: season1.start_on.strftime('%Y-%m-%d'),
          end_on: season1.end_on.try(:strftime, '%Y-%m-%d'),
          period: season1.period
        },
        {
          id: season2.id,
          anime_id: season2.anime_id,
          phase: season2.phase,
          name: season2.name,
          start_on: season2.start_on.strftime('%Y-%m-%d'),
          end_on: season2.end_on.try(:strftime, '%Y-%m-%d'),
          period: season2.period
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

describe 'GET /api/admin/animes/:anime_id/seasons/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime).decorate }

  it '200とアニメのシーズン詳細が返ってくること' do
    get "/api/admin/animes/#{anime.id}/seasons/#{season.id}"
    expect(response.status).to eq 200

    json = {
      id: season.id,
      phase: season.phase,
      name: season.name,
      start_on: season.start_on.strftime('%Y-%m-%d'),
      end_on: season.end_on.try(:strftime, '%Y-%m-%d'),
      period: season.period
    }
    expect(response.body).to be_json_as(json)
  end
end


describe 'POST /api/admin/animes/:anime_id/seasons', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season_phase) { 1 }
  let!(:season_name) { 'シーズンワン' }
  let!(:three_months_ago) { 3.months.ago.to_date }
  let!(:one_month_ago) { 1.month.ago.to_date }
  let!(:params) do
    { season: {
      phase: season_phase,
      name: season_name,
      start_on: three_months_ago,
      end_on: one_month_ago
    } }
  end

  context '正しい値を設定した場合' do
    it '201が返ってくること' do
      post "/api/admin/animes/#{anime.id}/seasons", params: params
      expect(response.status).to eq 201
      season = anime.seasons.last
      expect(season.phase).to eq 1
      expect(season.name).to eq 'シーズンワン'
      expect(season.start_on).to eq three_months_ago
      expect(season.end_on).to eq one_month_ago
    end
  end

  context 'シーズンの期を空で設定した場合' do
    let(:season_phase) { '' }

    it '422とエラーメッセージが返ってくること' do
      post "/api/admin/animes/#{anime.id}/seasons", params: params
      expect(response.status).to eq 422

      json = {
        error_messages: ['シーズンの期を入力してください']
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'シーズンの期にマイナス値を設定した場合' do
    let(:season_phase) { '-1' }

    it '422とエラーメッセージが返ってくること' do
      post "/api/admin/animes/#{anime.id}/seasons", params: params
      expect(response.status).to eq 422

      json = {
        error_messages: ['シーズンの期は1以上の値にしてください']
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'PATCH /api/admin/animes/1/seasons/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime).decorate }
  let!(:season2) { create(:season, anime: anime).decorate }

  context '正しい値を設定していた場合' do
    let!(:params) { { season: attributes_for(:season) } }

    it '200が返ってくること' do
      patch "/api/admin/animes/#{anime.id}/seasons/#{season1.id}", params: params
      expect(response.status).to eq 200
    end
  end

  context '基を設定していなかった場合' do
    let!(:params) { { season: attributes_for(:season, phase: '') } }

    it '422とエラーメッセージが返ってくること' do
      patch "/api/admin/animes/#{anime.id}/seasons/#{season1.id}", params: params
      expect(response.status).to eq 422

      json = {
        error_messages: ['シーズンの期を入力してください']
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

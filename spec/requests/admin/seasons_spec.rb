# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/animes/1/seasons', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime).decorate }
  let!(:season2) { create(:season, anime: anime).decorate }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/animes/#{anime.id}/seasons"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200とアニメ一覧が返ってくること' do
      get "/api/admin/animes/#{anime.id}/seasons", headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        anime_title: anime.title,
        seasons: [
          {
            id: season2.id,
            anime_id: season2.anime_id,
            anime_title: season2.anime_title,
            phase: season2.phase,
            previous_name: season2.previous_name,
            behind_name: season2.behind_name,
            disabled: season2.disabled,
            start_on: season2.start_on.strftime('%Y-%m-%d'),
            end_on: season2.end_on.try(:strftime, '%Y-%m-%d'),
            period: season2.period
          },
          {
            id: season1.id,
            anime_id: season1.anime_id,
            anime_title: season1.anime_title,
            phase: season1.phase,
            previous_name: season1.previous_name,
            behind_name: season1.behind_name,
            disabled: season1.disabled,
            start_on: season1.start_on.strftime('%Y-%m-%d'),
            end_on: season1.end_on.try(:strftime, '%Y-%m-%d'),
            period: season1.period
          }
        ]
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'GET /api/admin/animes/:anime_id/seasons/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime).decorate }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/animes/#{anime.id}/seasons/#{season.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200とアニメのシーズン詳細が返ってくること' do
      get "/api/admin/animes/#{anime.id}/seasons/#{season.id}",
          headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        id: season.id,
        phase: season.phase,
        anime_title: season.decorate.anime_title,
        previous_name: season.previous_name,
        behind_name: season.behind_name,
        disabled: season.disabled,
        start_on: season.start_on.strftime('%Y-%m-%d'),
        end_on: season.end_on.try(:strftime, '%Y-%m-%d'),
        period: season.period
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'POST /api/admin/animes/:anime_id/seasons', autodoc: true do
  let!(:anime) { create(:anime, title: 'アニメタイトル') }
  let!(:season_phase) { 1 }
  let!(:season_previous_name) { '続' }
  let!(:season_behind_name) { 'シーズンワン' }
  let!(:three_months_ago) { 3.months.ago.to_date }
  let!(:one_month_ago) { 1.month.ago.to_date }
  let!(:params) do
    { season: {
      phase: season_phase,
      previous_name: season_previous_name,
      behind_name: season_behind_name,
      start_on: three_months_ago,
      end_on: one_month_ago
    } }
  end

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      post "/api/admin/animes/#{anime.id}/seasons"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context '正しい値を設定した場合' do
      it '201が返ってくること' do
        post "/api/admin/animes/#{anime.id}/seasons",
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201
        season = anime.seasons.last
        expect(season.phase).to eq 1
        expect(season.decorate.anime_title).to eq '続 アニメタイトル シーズンワン （第1期）'
        expect(season.previous_name).to eq '続'
        expect(season.behind_name).to eq 'シーズンワン'
        expect(season.start_on).to eq three_months_ago
        expect(season.end_on).to eq one_month_ago
      end
    end

    context 'シーズンの期を空で設定した場合' do
      let(:season_phase) { '' }

      it '422とエラーメッセージが返ってくること' do
        post "/api/admin/animes/#{anime.id}/seasons",
             params: params, headers: login_headers(user)
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
        post "/api/admin/animes/#{anime.id}/seasons",
             params: params, headers: login_headers(user)
        expect(response.status).to eq 422

        json = {
          error_messages: ['シーズンの期は1以上の値にしてください']
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

describe 'PATCH /api/admin/animes/1/seasons/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime).decorate }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      patch "/api/admin/animes/#{anime.id}/seasons/#{season.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context '正しい値を設定していた場合' do
      let!(:params) { { season: attributes_for(:season) } }

      it '200が返ってくること' do
        patch "/api/admin/animes/#{anime.id}/seasons/#{season.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 200
      end
    end

    context 'シーズンの期を設定していなかった場合' do
      let!(:params) { { season: attributes_for(:season, phase: '') } }

      it '422とエラーメッセージが返ってくること' do
        patch "/api/admin/animes/#{anime.id}/seasons/#{season.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 422

        json = {
          error_messages: ['シーズンの期を入力してください']
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

describe 'DELETE /api/admin/animes/:anime_id/seasons/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      delete "/api/admin/animes/#{anime.id}/seasons/#{season.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200が返ってくること' do
      delete "/api/admin/animes/#{anime.id}/seasons/#{season.id}",
             headers: login_headers(user)
      expect(response.status).to eq 200
    end
  end
end

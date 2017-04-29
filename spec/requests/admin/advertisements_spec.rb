# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/animes/:anime_id/advertisements', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }
  let!(:advertisement1) { create(:advertisement, anime: anime) }
  let!(:advertisement2) { create(:advertisement, anime: nil, season: season) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/animes/#{anime.id}/advertisements"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200とアニメ一覧が返ってくること' do
      get "/api/admin/animes/#{anime.id}/advertisements",
          headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        advertisements: [
          {
            id: advertisement1.id,
            anime_id: advertisement1.anime_id,
            season_id: advertisement1.season_id,
            season_phase: nil,
            body: advertisement1.body
          },
          {
            id: advertisement2.id,
            anime_id: advertisement2.anime_id,
            season_id: advertisement2.season_id,
            season_phase: advertisement2.season.phase,
            body: advertisement2.body
          }
        ]
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'POST /api/admin/advertisements', autodoc: true do
  context 'ログインしていない場合' do
    it '401が返ってくること' do
      post '/api/admin/advertisements'
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context 'アニメに広告を追加した場合' do
      let!(:anime) { create(:anime) }
      let(:params) do
        { advertisement: attributes_for(:advertisement, anime_id: anime.id) }
      end

      it '201が返ってくること' do
        post '/api/admin/advertisements',
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201
      end
    end

    context '声優に広告を追加した場合' do
      let!(:actor) { create(:actor) }
      let(:params) do
        {
          advertisement:
            attributes_for(:advertisement, anime_id: nil, actor_id: actor.id)
        }
      end

      it '201が返ってくること' do
        post '/api/admin/advertisements',
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201
      end
    end

    context 'シーズンに広告を追加した場合' do
      let!(:season) { create(:season) }
      let(:params) do
        {
          advertisement:
            attributes_for(:advertisement, anime_id: nil, season_id: season.id)
        }
      end

      it '201が返ってくること' do
        post '/api/admin/advertisements',
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201
      end
    end

    context '紐づくidのない広告を追加した場合' do
      let(:params) { { advertisement: attributes_for(:advertisement) } }

      it '422とエラーメッセージが返ってくること' do
        post '/api/admin/advertisements',
             params: params, headers: login_headers(user)
        expect(response.status).to eq 422

        json = {
          error_messages: ['所属が不明な広告です']
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

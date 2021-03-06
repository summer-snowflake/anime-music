# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/animes', autodoc: true do
  let!(:anime1) { create(:anime, created_at: 2.minutes.ago) }
  let!(:anime2) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1, phase: 1).decorate }
  let!(:season2) { create(:season, anime: anime1, phase: 2).decorate }
  let!(:melody1) { create(:melody, :op, season: season1) }
  let!(:melody2) { create(:melody, :ed, season: season1) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get '/api/admin/animes'
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200とアニメ一覧が返ってくること' do
      get '/api/admin/animes', headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        animes: [
          {
            id: anime2.id,
            title: anime2.title,
            picture: anime2.picture.url,
            airing: false,
            seasons: []
          },
          {
            id: anime1.id,
            title: anime1.title,
            picture: anime1.picture.url,
            airing: true,
            seasons: [
              {
                id: season2.id,
                anime_title: season2.anime_title,
                melodies: []
              },
              {
                id: season1.id,
                anime_title: season1.anime_title,
                melodies: [
                  {
                    id: melody1.id,
                    kind: melody1.kind,
                    title: melody1.title,
                    draft: melody1.draft
                  },
                  {
                    id: melody2.id,
                    kind: melody2.kind,
                    title: melody2.title,
                    draft: melody2.draft
                  }
                ]
              }
            ]
          }
        ]
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'GET /api/admin/animes/:id', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/animes/#{anime.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200とアニメ詳細が返ってくること' do
      get "/api/admin/animes/#{anime.id}", headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        id: anime.id,
        title: anime.title,
        picture: anime.picture.url,
        summary: anime.summary,
        wiki_url: anime.wiki_url,
        airing: true
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

describe 'PATCH /api/admin/animes/:id' do
  let!(:anime) { create(:anime) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      patch "/api/admin/animes/#{anime.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context 'タイトルの変更' do
      let!(:params) { { id: anime.id, title: title } }
      let!(:title) { 'タイトル' }
      context 'タイトルが空の場合' do
        let(:title) { '' }

        it '422とエラーメッセージが返ってくること' do
          patch "/api/admin/animes/#{anime.id}",
                params: params, headers: login_headers(user)
          expect(response.status).to eq 422

          json = {
            error_messages: ['タイトルを入力してください']
          }
          expect(response.body).to be_json_as(json)
        end
      end

      context 'タイトルが正常値の場合' do
        it '200が返ってくること' do
          patch "/api/admin/animes/#{anime.id}",
                params: params, headers: login_headers(user)
          expect(response.status).to eq 200
        end
      end
    end

    context 'サマリとwiki URLの変更' do
      let!(:params) do
        { id: anime.id, summary: 'アニメサマリ', wiki_url: 'wiki_url' }
      end

      it '200が返ってくること' do
        patch "/api/admin/animes/#{anime.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 200
      end
    end

    context 'サムネイルの削除' do
      let!(:params) do
        { id: anime.id, remove_picture: 'true' }
      end

      it '200が返り、サムネイルが削除されること' do
        patch "/api/admin/animes/#{anime.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 200

        anime.reload
        expect(anime.picture.url).to be_nil
      end
    end
  end
end

describe 'DELETE /api/admin/animes/:id', autodoc: true do
  let!(:anime) { create(:anime) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      delete "/api/admin/animes/#{anime.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200が返ってくること' do
      delete "/api/admin/animes/#{anime.id}", headers: login_headers(user)
      expect(response.status).to eq 200
    end
  end
end

describe 'POST /api/admin/animes', autodoc: true do
  context 'ログインしていない場合' do
    it '401が返ってくること' do
      post '/api/admin/animes/'
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context '正しい値を設定した場合' do
      let!(:params) do
        { title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'wiki_url' }
      end

      it '201が返ってくること' do
        post '/api/admin/animes', params: params, headers: login_headers(user)
        expect(response.status).to eq 201
        anime = Anime.last
        expect(anime.title).to eq 'アニメタイトル'
        expect(anime.summary).to eq 'アニメサマリ'
        expect(anime.wiki_url).to eq 'wiki_url'
      end
    end

    context 'タイトルを空で設定した場合' do
      let!(:params) do
        { title: '', summary: 'アニメサマリ', wiki_url: 'wiki_url' }
      end

      it '422とエラーメッセージが返ってくること' do
        post '/api/admin/animes', params: params, headers: login_headers(user)
        expect(response.status).to eq 422

        json = {
          error_messages: ['タイトルを入力してください']
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

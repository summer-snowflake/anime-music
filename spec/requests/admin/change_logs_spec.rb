# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/change_logs', autodoc: true do
  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get '/api/admin/animes'
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context '変更履歴がない場合' do
      it '200と空が返ってくること' do
        get '/api/admin/change_logs', headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          anime_logs: []
        }
        expect(response.body).to be_json_as(json)
      end
    end

    context '変更履歴がある場合' do
      before do
        with_versioning do
          Timecop.freeze do
            post '/api/admin/animes/',
                  params: { title: '新規アニメ' }, headers: login_headers(user)
            @anime = Anime.last
            params = { id: @anime.id, title: 'タイトル変更' }
            patch "/api/admin/animes/#{@anime.id}",
                  params: params, headers: login_headers(user)
          end
        end
      end

      it '200と変更情報が返ってくること' do
        get '/api/admin/change_logs', headers: login_headers(user)
        expect(response.status).to eq 200

        @anime.reload
        first_log = @anime.versions.first
        second_log = @anime.versions.last

        json = {
          anime_logs: [
            {
              id: second_log.id,
              event: 'update',
              item_title: 'タイトル変更',
              operator_email: user.email,
              object_changes: {
                title: ['新規アニメ', 'タイトル変更']
              }
            },
            {
              id: first_log.id,
              event: 'create',
              item_title: 'タイトル変更',
              operator_email: user.email,
              object_changes: {
                id: [nil, @anime.id],
                title: [nil, '新規アニメ'],
                created_by: [nil, user.id],
                updated_by: [nil, user.id]
              }
            }
          ]
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

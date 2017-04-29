# frozen_string_literal: true

require 'rails_helper'

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

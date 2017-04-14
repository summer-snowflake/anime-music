# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/seasons/1/melodies', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }
  let!(:op_melody) { create(:melody, season: season, kind: :op) }
  let!(:ed_melody) { create(:melody, season: season, kind: :ed) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/seasons/#{season.id}/melodies"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context 'kindの指定がない場合' do
      it '200と曲一覧が返ってくること' do
        get "/api/admin/seasons/#{season.id}/melodies",
            headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          melodies: [
            {
              id: op_melody.id,
              title: op_melody.title,
              kind: op_melody.kind
            },
            {
              id: ed_melody.id,
              title: ed_melody.title,
              kind: ed_melody.kind
            }
          ]
        }
        expect(response.body).to be_json_as(json)
      end
    end

    context 'kindがopの場合' do
      it '200とオープニング曲一覧が返ってくること' do
        get "/api/admin/seasons/#{season.id}/melodies",
            params: { kind: 'op' },
            headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          melodies: [
            {
              id: op_melody.id,
              title: op_melody.title,
              kind: op_melody.kind
            }
          ]
        }
        expect(response.body).to be_json_as(json)
      end
    end

    context 'kindがedの場合' do
      it '200とエンディング曲一覧が返ってくること' do
        get "/api/admin/seasons/#{season.id}/melodies",
            params: { kind: 'ed' },
            headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          melodies: [
            {
              id: ed_melody.id,
              title: ed_melody.title,
              kind: ed_melody.kind
            }
          ]
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

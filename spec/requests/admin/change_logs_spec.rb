# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/change_logs', autodoc: true do
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

    context '変更履歴がない場合' do
      it '200と空が返ってくること' do
        get '/api/admin/change_logs', headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          animes: []
        }
      end
    end

=begin

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
=end
  end
end

# frozen_string_literal: true

require 'rails_helper'

feature 'アニメ詳細画面', js: true do
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime) }
  let!(:season2) { create(:season, anime: anime, disabled: true) }
  let!(:season3) { create(:season, anime: anime, end_on: Time.zone.yesterday) }
  let!(:melody1) { create(:melody, season: season1) }
  let!(:melody2) { create(:melody, season: season2) }
  let!(:melody3) { create(:melody, season: season2) }
  let!(:advertisement) { create(:advertisement, anime: anime) }
  let!(:melody_advertisement) { create(:advertisement, melody: melody2) }

  background do
    visit anime_path(anime)
  end

  scenario 'アニメの情報が表示されること' do
    within 'h1' do
      expect(page).to have_content anime.title
    end
    within '.animeComponent' do
      expect(page).to have_content anime.summary
      expect(page).to have_css '.thumbnail'
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

feature 'トップページ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }
  let!(:anime3) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1) }
  let!(:season2) { create(:season, anime: anime2) }
  let!(:season3) { create(:season, anime: anime3, end_on: Time.zone.yesterday) }
  let!(:melody) { create(:melody, season: season1) }
  let!(:advertisement) { create(:advertisement, anime: anime1) }
  let!(:melody_advertisement) { create(:advertisement, melody: melody) }

  background do
    visit root_path
  end

  scenario '放送中のアニメ一覧が表示されること' do
    expect(page).to have_content anime1.title
    expect(page).to have_content anime2.title
    expect(page).to have_no_content anime3.title
  end

  scenario '動画データがある場合動画が表示されること' do
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    within '.movieComponent' do
      expect(page).to have_css 'iframe'
    end
  end

  scenario '曲に広告データがある場合広告が表示されること' do
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    within '.movieComponent' do
      expect(page).to have_css "a[href='https://url.com']" 
    end
  end

  scenario '広告一覧が表示されること' do
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    within '.advertisementComponent' do
      expect(page).to have_css "a[href='https://url.com']"
    end
  end
end

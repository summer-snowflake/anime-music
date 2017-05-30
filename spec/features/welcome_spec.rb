# frozen_string_literal: true

require 'rails_helper'

feature 'トップページ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime, picture: nil) }
  let!(:anime3) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1) }
  let!(:season2) { create(:season, anime: anime2, disabled: true) }
  let!(:season3) { create(:season, anime: anime3, end_on: Time.zone.yesterday) }
  let!(:melody1) { create(:melody, season: season1) }
  let!(:melody2) { create(:melody, season: season2) }
  let!(:advertisement) { create(:advertisement, anime: anime1) }
  let!(:melody_advertisement) { create(:advertisement, melody: melody1) }

  background do
    visit root_path
  end

  scenario '放送中のアニメ一覧が表示されること' do
    expect(page).to have_content anime1.title
    expect(page).to have_content anime2.title
    expect(page).to have_no_content anime3.title
  end

  scenario 'disabledがtrueの場合のみ(第n期)は非表示になること' do
    expect(page).to have_content anime1.title
    expect(page).to have_content season1.behind_name
    expect(page).to have_content '第' + season1.phase.to_s + '期'

    expect(page).to have_content anime2.title
    expect(page).to have_content season2.behind_name
    expect(page).to have_no_content '第' + season2.phase.to_s + '期'
    expect(page).to have_content season2.behind_name
  end

  scenario '画像データがある場合のみ画像が表示されること' do
    within "#season-#{season1.id}" do
      expect(page).to have_css '.thumbnail'
    end
    within "#season-#{season2.id}" do
      expect(page).to have_no_css '.thumbnail'
    end
  end

  scenario '動画データがある場合動画が表示されること' do
    expect(page).to have_no_css '.movieComponent'
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    within '.movieComponent' do
      expect(page).to have_css 'iframe'
    end
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    expect(page).to have_no_css '.movieComponent'
  end

  scenario '曲に広告データがある場合広告が表示されること' do
    expect(page).to have_no_css '.movieComponent'
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    within '.movieComponent' do
      expect(page).to have_css "a[href='https://url.com']"
    end
    within "#season-#{season1.id}" do
      find('.show-movie-link').click
    end
    expect(page).to have_no_css '.movieComponent'
  end

  scenario '広告一覧が表示されること' do
    within '.advertisementComponent' do
      expect(page).to have_css "a[href='https://url.com']"
      expect(page).to have_content advertisement.tag_name
    end
  end

  scenario 'PRラベルクリックで、広告一覧が更新されること' do
    within "#season-#{season1.id}" do
      find('.glyphicon-refresh').click
    end
    within '.advertisementComponent' do
      expect(page).to have_css "a[href='https://url.com']"
      expect(page).to have_content advertisement.tag_name
    end
  end
end

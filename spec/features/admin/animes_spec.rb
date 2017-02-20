# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    visit admin_animes_path
  end

  scenario 'アニメ一覧が表示されること' do
    within "#anime-#{anime1.id}" do
      expect(page).to have_content anime1.title
    end
    within "#anime-#{anime2.id}" do
      expect(page).to have_content anime2.title
    end
  end

  scenario 'アニメ一覧から詳細画面が表示されること' do
    within "#anime-#{anime1.id} .media-heading" do
      click_link anime1.title
    end

    expect(current_path).to eq admin_anime_path(id: anime1.id)
    expect(page).to have_content anime1.title
    expect(page).to have_content anime1.summary
    expect(page).to have_content anime1.wiki_url
    expect(page).to have_selector "img[src='#{anime1.picture}'"
  end

  context 'シーズンが登録されていた場合' do
    let!(:season1) { create(:season, anime: anime1) }
    let!(:season2) { create(:season, anime: anime1) }
    let!(:season3) { create(:season, anime: anime2) }

    scenario 'アニメ詳細画面でシーズン一覧が表示されること' do
      visit admin_anime_path(id: anime1.id)

      within '.adminAnimeSeasonsComponent' do
        expect(page).to have_content season1.name
        expect(page).to have_content season2.name
        expect(page).not_to have_content season3.name
      end
    end
  end
end
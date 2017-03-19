# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：シーズン', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    visit admin_anime_path(anime1)
  end

  context 'シーズンが登録されていた場合' do
    let!(:season1) { create(:season, anime: anime1) }
    let!(:season2) { create(:season, anime: anime1) }
    let!(:season3) { create(:season, anime: anime2) }

    scenario 'アニメ詳細画面で該当アニメのシーズン一覧が表示されること' do
      visit admin_anime_path(id: anime1.id)

      within '.adminAnimeSeasonsComponent' do
        expect(page).to have_content season1.name
        expect(page).to have_content season2.name
        expect(page).not_to have_content season3.name
      end
    end
  end

  scenario 'シーズンを登録できること' do
    within '.adminAnimeSeasonNewFieldComponent' do
      find('.btn-default').click
      fill_in 'start_on', with: 3.months.ago.to_date
      fill_in 'end_on', with: 1.month.ago.to_date
      fill_in 'phase', with: '1'
      fill_in 'name', with: '新しいシーズン名'
      find('.btn-danger').click
    end

    expect(page).to have_content '新しいシーズン名'
    expect(anime1.seasons.count).to eq 1
  end

  context 'シーズンが登録されていた場合' do
    let!(:season1) { create(:season, anime: anime1) }
    let!(:season2) { create(:season, anime: anime1) }
    let!(:season3) { create(:season, anime: anime1) }

    background do
      visit admin_anime_path(anime1)
    end

    scenario '対象のシーズンを編集できること' do
      find("#season-#{season1.id}").hover

      within "#season-#{season1.id}" do
        expect(page).to have_content season1.name
        find('.glyphicon-pencil').click

        fill_in 'start_on', with: 3.months.ago.to_date
        fill_in 'end_on', with: 1.month.ago.to_date
        fill_in 'phase', with: '8'
        fill_in 'name', with: '編集したシーズン名'
        find('.btn-danger').click

        expect(page).not_to have_content season1.name
        expect(page).to have_content '編集したシーズン名'
      end
    end

    scenario 'シーズン一覧から対象のシーズンを削除できること' do
      find("#season-#{season2.id}").hover
      within "#season-#{season2.id}" do
        expect(page).to have_content season2.name
        find('.glyphicon-pencil').click
        find('.glyphicon-trash').click
      end
      within '.modal-footer' do
        find('.btn-danger').click
      end
      expect(page).to have_content season1.name
      expect(page).not_to have_content season2.name
      expect(page).to have_content season3.name

      expect(anime1.seasons.find_by(id: season2.id)).to be_nil
    end
  end
end
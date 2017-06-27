# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：シーズン', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    login(user)
    visit admin_anime_path(anime1)
  end

  context 'シーズンが登録されていた場合' do
    let!(:season1) { create(:season, anime: anime1) }
    let!(:season2) { create(:season, anime: anime1, disabled: true) }
    let!(:season3) { create(:season, anime: anime2) }

    scenario 'アニメ詳細画面で該当アニメのシーズン一覧が表示されること' do
      visit admin_anime_path(id: anime1.id)

      within '.adminAnimeSeasonsComponent' do
        expect(page).to have_content '第' + season1.phase.to_s + '期'
        expect(page).to have_content season1.previous_name
        expect(page).to have_content season1.behind_name
        expect(page).to have_no_content '第' + season2.phase.to_s + '期'
        expect(page).to have_content season2.previous_name
        expect(page).to have_content season2.behind_name
        expect(page).not_to have_content season3.behind_name
      end
    end
  end

  scenario 'シーズンを登録できること' do
    within '.adminAnimeSeasonNewFieldComponent' do
      find('.adminNewButtonFieldComponent').click
      fill_in 'start_on', with: 3.months.ago.to_date
      fill_in 'end_on', with: 1.month.ago.to_date
      fill_in 'phase', with: '1'
      fill_in 'previous_name', with: '続'
      fill_in 'behind_name', with: '新しいシーズン名'
      check 'disabled'
      find('.btn-danger').click
    end

    expect(page).to have_content '続 ' + anime1.title + ' 新しいシーズン名'
    expect(anime1.seasons.count).to eq 1
    expect(anime1.seasons.last.disabled).to be_truthy
  end

  context 'シーズンが登録されていた場合' do
    let!(:season1) { create(:season, anime: anime1) }
    let!(:season2) { create(:season, anime: anime1) }
    let!(:season3) { create(:season, anime: anime1) }

    background do
      login(user)
      visit admin_anime_path(anime1)
    end

    scenario '対象のシーズンを編集できること' do
      find("#season-#{season1.id}").hover

      within "#season-#{season1.id}" do
        expect(page).to have_content season1.behind_name
        find('.glyphicon-pencil').click

        fill_in 'start_on', with: 3.months.ago.to_date
        fill_in 'end_on', with: 1.month.ago.to_date
        fill_in 'phase', with: '1'
        fill_in 'previous_name', with: '編集した先頭シーズン名'
        fill_in 'behind_name', with: '編集したシーズン名'
        find('.btn-danger').click

        expect(page).not_to have_content season1.behind_name
        expect(page).to have_content '編集した先頭シーズン名'
        expect(page).to have_content '編集したシーズン名'
      end
    end

    scenario 'シーズン一覧から対象のシーズンを削除できること' do
      find("#season-#{season2.id}").hover
      within "#season-#{season2.id}" do
        expect(page).to have_content season2.behind_name
        find('.glyphicon-pencil').click
        find('.glyphicon-trash').click
      end
      within '.modal-footer' do
        find('.btn-danger').click
      end
      expect(page).to have_content season1.behind_name
      expect(page).not_to have_content season2.behind_name
      expect(page).to have_content season3.behind_name

      expect(anime1.seasons.find_by(id: season2.id)).to be_nil
    end
  end

  after do
    logout
  end
end

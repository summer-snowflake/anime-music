# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：シーズン', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }

  background do
    login(user)
    visit admin_anime_path(anime)
  end

  context 'シーズンに曲が登録されていた場合' do
    let!(:melody) { create(:melody, season: season) }

    scenario 'アニメ詳細画面で該当シーズンに曲が表示されること' do
      visit admin_anime_path(id: anime.id)

      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content melody.kind.upcase
        expect(page).to have_content melody.title
      end
    end
  end

  scenario '対象のシーズンに曲が登録できること' do
    within "#season-#{season.id}" do
      within '.adminNewButtonFieldComponent' do
        find('.btn-primary').click
      end
      within '.adminSeasonMelodyNewFieldComponent' do
        find('.label-default').click
        fill_in 'title', with: '曲のタイトル'
        find('.btn-danger').click
      end

      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content 'ED'
        expect(page).to have_content '曲のタイトル'
      end
    end
  end
end

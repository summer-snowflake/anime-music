# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：シーズン', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime) { create(:anime) }

  background do
    login(user)
    visit admin_anime_path(anime)
  end

  context 'シーズンに曲が登録されていた場合' do
    let!(:season) { create(:season, anime: anime) }
    let!(:melody) { create(:melody, season: season) }

    scenario 'アニメ詳細画面で該当シーズンに曲が表示されること' do
      visit admin_anime_path(id: anime.id)

      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content melody.kind.upcase
        expect(page).to have_content melody.title
      end
    end
  end
end

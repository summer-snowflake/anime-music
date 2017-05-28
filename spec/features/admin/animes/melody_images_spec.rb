# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：シーズン、曲の画像', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:melody) { create(:melody, :with_season) }

  background do
    login(user)
  end

  context '曲に画像が登録されていた場合' do
    let!(:melody_image1) { create(:melody_image, melody: melody) }
    let!(:melody_image2) { create(:melody_image, melody: melody) }

    background do
      visit admin_anime_path(melody.season.anime)
    end

    scenario 'アニメ詳細画面で該当の曲の編集で画像が表示されること' do
      within "#season-#{melody.season.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          find("#melody-#{melody.id}").hover
          find('.glyphicon-pencil').click
        end
        within '.adminSeasonMelodyEditFieldComponent' do
          expect(page).to have_selector('.adminMelodyImageComponent', count: 2)
        end
      end
    end

    scenario 'アニメ詳細画面で該当の曲の編集で画像が削除できること' do
      within "#season-#{melody.season.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          find("#melody-#{melody.id}").hover
          find('.glyphicon-pencil').click
        end
        within '.adminSeasonMelodyEditFieldComponent' do
          page.all('.adminMelodyImageComponent')[0].hover
          page.all('.glyphicon-trash')[0].click
          expect(page).to have_selector('.adminMelodyImageComponent', count: 1)
        end
      end
    end
  end
end

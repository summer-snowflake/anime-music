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

    background do
      visit admin_anime_path(anime)
    end

    scenario 'アニメ詳細画面で該当シーズンに曲が表示されること' do
      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content melody.kind.upcase
        expect(page).to have_content melody.title
      end
    end

    scenario '対象の曲が編集できること' do
      within '.adminAnimeSeasonMelodiesComponent' do
        find("#melody-#{melody.id}").hover
        find('.glyphicon-pencil').click
      end
      within '.adminSeasonMelodyEditFieldComponent' do
        find('.label-default').click
        fill_in 'title', with: '曲のタイトルを編集'
        fill_in 'youtube',
                with: '<iframe width="560" height="315" \
                      src="https://www.youtube.com/embed/vgFCRaymmI4" \
                      frameborder="0" allowfullscreen></iframe>'
        find('.btn-danger').click
      end
      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content 'ED'
        expect(page).to have_content '曲のタイトルを編集'
        expect(page).to have_css 'span.glyphicon-modal-window'
      end
    end

    scenario '対象の曲が削除できること' do
      within '.adminAnimeSeasonMelodiesComponent' do
        find("#melody-#{melody.id}").hover
        find('.glyphicon-pencil').click
        within '.adminSeasonMelodyEditFieldComponent' do
          find('.glyphicon-trash').click
        end
      end
      within '.modal-footer' do
        find('.btn-danger').click
      end
      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).not_to have_content melody.kind.upcase
        expect(page).not_to have_content melody.title
      end
    end

    scenario '対象の曲の動画が表示されること' do
      within '.adminAnimeSeasonMelodiesComponent' do
        within "#melody-#{melody.id}" do
          find('.glyphicon-modal-window').click
        end
      end

      within '.modal-body' do
        expect(page).to have_css 'iframe'
      end
      within '.modal-footer' do
        find('.btn-default').click
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

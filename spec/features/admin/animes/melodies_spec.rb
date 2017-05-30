# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：シーズン', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime) { create(:anime) }
  let!(:season1) { create(:season, anime: anime) }
  let!(:season2) { create(:season, anime: anime) }

  background do
    login(user)
    visit admin_anime_path(anime)
  end

  context 'シーズンに曲が登録されていた場合' do
    let!(:melody) { create(:melody, season: season2) }

    background do
      visit admin_anime_path(anime)
    end

    scenario 'アニメ詳細画面で該当シーズンに曲が表示されること' do
      within "#season-#{season2.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          expect(page).to have_content melody.kind.upcase
          expect(page).to have_content melody.title
        end
      end
    end

    scenario '対象の曲が編集できること' do
      within "#season-#{season2.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          find("#melody-#{melody.id}").hover
          find('.glyphicon-pencil').click
        end
        within '.adminSeasonMelodyEditFieldComponent' do
          find('#IM').click
          fill_in 'title', with: '曲のタイトルを編集'
          fill_in 'youtube',
                  with: '<iframe width="560" height="315" \
                        src="https://www.youtube.com/embed/vgFCRaymmI4" \
                        frameborder="0" allowfullscreen></iframe>'
          find('.btn-danger').click
        end
        within '.adminAnimeSeasonMelodiesComponent' do
          expect(page).to have_content 'IM'
          expect(page).to have_content '曲のタイトルを編集'
          expect(page).to have_css 'span.glyphicon-modal-window'
        end
      end
    end

    scenario '対象の曲に広告を追加できること' do
      within "#season-#{season2.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          find("#melody-#{melody.id}").hover
          find('.glyphicon-pencil').click
        end
        within '.adminSeasonMelodyEditFieldComponent' do
          find('#IN').click
          fill_in 'title', with: '曲のタイトルを編集'
          fill_in 'youtube', with: ''
          fill_in 'body',
                  with: '<a href="https://example.com" >LINK</a>'
          find('.btn-danger').click
        end
        within '.adminAnimeSeasonMelodiesComponent' do
          within "#melody-#{melody.id}" do
            find('.glyphicon-modal-window').click
          end
        end
      end
      within '.modal-body' do
        expect(page).to have_content 'LINK'
      end
      within '.modal-footer' do
        find('.btn-default').click
      end
    end

    scenario '対象の曲が削除できること' do
      within "#season-#{season2.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          find("#melody-#{melody.id}").hover
          find('.glyphicon-pencil').click
        end
        find('.adminSeasonMelodyEditFieldComponent').hover
        within '.adminSeasonMelodyEditFieldComponent' do
          find('span.glyphicon-trash').click
        end
      end
      within '.modal-footer' do
        find('.btn-danger').click
      end
      within "#season-#{season2.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          expect(page).not_to have_content melody.kind.upcase
          expect(page).not_to have_content melody.title
        end
      end
    end

    scenario '対象の曲の動画が表示されること' do
      within "#season-#{season2.id}" do
        within '.adminAnimeSeasonMelodiesComponent' do
          within "#melody-#{melody.id}" do
            find('.glyphicon-modal-window').click
          end
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
    within "#season-#{season1.id}" do
      within '.adminNewButtonFieldComponent' do
        find('.btn-primary').click
      end
      within '.adminSeasonMelodyNewFieldComponent' do
        find('#IN').click
        fill_in 'title', with: '曲のタイトル'
        fill_in 'singer_name', with: '歌手氏名'
        fill_in 'lyric_writer', with: '作詞者氏名'
        fill_in 'composer', with: '作曲者氏名'
        fill_in 'adapter', with: '編曲者氏名'
        fill_in 'memo', with: 'めも・備考'
        find('.btn-danger').click
      end

      expect(page).to have_no_css '.draft'
      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content 'ED'
        expect(page).to have_content '曲のタイトル'
        expect(page).to have_content '歌　: 歌手氏名'
        expect(page).to have_content '作詞: 作詞者氏名'
        expect(page).to have_content '作曲: 作曲者氏名'
        expect(page).to have_content '編曲: 編曲者氏名'
      end
    end
  end

  scenario '対象のシーズンに下書きとして曲が登録できること' do
    within "#season-#{season1.id}" do
      within '.adminNewButtonFieldComponent' do
        find('.btn-primary').click
      end
      within '.adminSeasonMelodyNewFieldComponent' do
        find('.label-default').click
        fill_in 'title', with: '曲のタイトル'
        fill_in 'singer_name', with: '歌手氏名'
        fill_in 'lyric_writer', with: '作詞者氏名'
        fill_in 'composer', with: '作曲者氏名'
        fill_in 'adapter', with: '編曲者氏名'
        fill_in 'memo', with: 'めも・備考'
        check 'draft'
        find('.btn-danger').click
      end

      expect(page).to have_css '.draft'
      within '.adminAnimeSeasonMelodiesComponent' do
        expect(page).to have_content 'IN'
        expect(page).to have_content '曲のタイトル'
        expect(page).to have_content '歌　: 歌手氏名'
        expect(page).to have_content '作詞: 作詞者氏名'
        expect(page).to have_content '作曲: 作曲者氏名'
        expect(page).to have_content '編曲: 編曲者氏名'
      end
    end
  end
end

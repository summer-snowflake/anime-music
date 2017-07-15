# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：曲詳細：広告', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:melody) { create(:melody, :with_season) }

  background do
    login(user)
  end

  context '曲に広告が登録されていた場合' do
    let!(:advertisement1) { create(:advertisement, melody: melody) }
    let!(:advertisement2) { create(:advertisement, melody: melody) }

    scenario '曲詳細画面で該当曲の広告一覧が表示されること' do
      visit admin_melody_path(melody)

      within '.adminMelodyAdvertisementsComponent' do
        expect(page).to have_css "a[href='https://url.com']"
        expect(page).to have_content advertisement1.tag_name
        expect(page).to have_content advertisement2.tag_name
      end
    end

    scenario '曲の広告を削除できること' do
      visit admin_melody_path(melody)

      within '.adminMelodyAdvertisementsComponent' do
        find("#advertisement-#{advertisement1.id}").hover
        within "#advertisement-#{advertisement1.id}" do
          find('.glyphicon-trash').click
        end
      end
      within '.modal-footer' do
        find('.btn-danger').click
      end
      expect(page).to have_no_css "#advertisement-#{advertisement1.id}"
      expect(page).to have_css "#advertisement-#{advertisement2.id}"
      expect(page).to have_content advertisement2.tag_name
    end
  end

  scenario '曲の広告を登録できること' do
    visit admin_melody_path(melody)
    within '.adminMelodyAdvertisementsComponent' do
      find('.adminNewButtonFieldComponent').click
    end
    within '.adminMelodyAdvertisementNewFieldComponent' do
      fill_in 'tag_name', with: '広告のタグ名'
      fill_in 'body', with: "<a href='https://example.com'>URL</a>"
      find('.btn-danger').click
    end

    within '.adminMelodyAdvertisementsComponent' do
      expect(page).to have_content 'URL'
      expect(page).to have_css "a[href='https://example.com']"
      expect(page).to have_content '広告のタグ名'
    end
  end

  after do
    logout
  end
end

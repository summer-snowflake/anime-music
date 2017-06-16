# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime1) { create(:anime, picture: nil) }
  let!(:anime2) { create(:anime) }

  background do
    login(user)
  end

  context 'サムネイルが登録されていない場合' do
    background do
      visit admin_anime_path(id: anime1.id)
    end

    scenario '詳細画面でサムネイルをファイルアップロードできること' do
      within '.adminAnimeThumbnailComponent' do
        file_path = Rails.root.join('spec', 'fixtures', 'cat.jpg')
        attach_file('upload-file', file_path, make_visible: true)

        expect(find('img')['src'])
          .to have_content "/anime-music-uploads/anime/#{anime1.id}/cat.jpg"
        anime1.reload
        expect(anime1.picture.url)
          .to eq "/anime-music-uploads/anime/#{anime1.id}/cat.jpg"
      end
    end
  end

  context 'サムネイルが登録されている場合' do
    background do
      visit admin_anime_path(id: anime2.id)
    end

    scenario '詳細画面でサムネイルをファイルアップロードできること' do
      within '.adminAnimeThumbnailComponent' do
        expect(find('img')['src'])
          .to have_content "/anime-music-uploads/anime/#{anime2.id}/clover.gif"
        expect(anime2.picture.url)
          .to eq "/anime-music-uploads/anime/#{anime2.id}/clover.gif"

        file_path = Rails.root.join('spec', 'fixtures', 'cat.jpg')
        attach_file('upload-file', file_path, make_visible: true)

        sleep 1
        expect(find('img')['src'])
          .to have_content "/anime-music-uploads/anime/#{anime2.id}/cat.jpg"
        anime2.reload
        expect(anime2.picture.url)
          .to eq "/anime-music-uploads/anime/#{anime2.id}/cat.jpg"
      end
    end

    scenario '詳細画面でサムネイルを削除できること' do
      within '.adminAnimeThumbnailComponent' do
        expect(find('img')['src'])
          .to have_content "/anime-music-uploads/anime/#{anime2.id}/clover.gif"
        expect(anime2.picture.url)
          .to eq "/anime-music-uploads/anime/#{anime2.id}/clover.gif"

        find('.thumbnail').hover
        find('.glyphicon-trash').click
      end

      within '.modal-footer' do
        find('.btn-danger').click
      end
      expect(page).to have_no_css 'img'
    end
  end
end

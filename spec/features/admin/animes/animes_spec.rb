# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    login(user)
  end

  scenario 'アニメ一覧が表示されること' do
    visit admin_animes_path
    within "#anime-#{anime1.id}" do
      expect(page).to have_content anime1.title
    end
    within "#anime-#{anime2.id}" do
      expect(page).to have_content anime2.title
    end
  end

  scenario 'アニメ一覧から詳細画面が表示されること' do
    visit admin_animes_path
    within "#anime-#{anime1.id} .media-heading" do
      click_link anime1.title
    end

    expect(current_path).to eq admin_anime_path(id: anime1.id)
    expect(page).to have_content anime1.title
    expect(page).to have_content anime1.summary
    expect(page).to have_content anime1.wiki_url
  end

  scenario 'アニメ一覧から対象のアニメを削除できること' do
    visit admin_animes_path
    within "#anime-#{anime1.id}" do
      find('.glyphicon-trash').click
    end
    within '.modal-footer' do
      find('.btn-danger').click
    end
    expect(page).not_to have_content anime1.title

    expect(Anime.find_by(id: anime1.id)).to be_nil
  end

  scenario '正しい値と「登録」ボタンで、アニメを新規作成できること' do
    visit admin_animes_path
    within '.adminAnimeNewFormComponent' do
      find('.btn-primary').click
      fill_in 'title', with: '新しいタイトル'
      fill_in 'summary', with: '新しいあらすじ'
      fill_in 'wiki-url', with: 'http://new-wiki.com'
      find('.btn-danger').click
      expect(page).to have_content '登録しました'
    end

    expect(Anime.last.title).to eq '新しいタイトル'
  end

  scenario '正しい値と「キャンセル」ボタンで、アニメが登録されないこと' do
    visit admin_animes_path
    within '.adminAnimeNewFormComponent' do
      find('.btn-primary').click
      fill_in 'title', with: '新しいタイトル'
      fill_in 'summary', with: '新しいあらすじ'
      fill_in 'wiki-url', with: 'http://new-wiki.com'
      find('.btn-default').click
    end

    expect(Anime.count).to eq 2
  end

  scenario '不正な値と「登録」ボタンで、アニメが登録されないこと' do
    visit admin_animes_path
    within '.adminAnimeNewFormComponent' do
      find('.btn-primary').click
      fill_in 'title', with: ''
      fill_in 'summary', with: '新しいあらすじ'
      fill_in 'wiki-url', with: 'http://new-wiki.com'
      find('.btn-danger').click
      expect(page).to have_content 'タイトルを入力してください'
    end

    expect(Anime.count).to eq 2
  end

  after do
    logout
  end
end

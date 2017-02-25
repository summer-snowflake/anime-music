# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    visit admin_animes_path
  end

  scenario 'アニメ一覧が表示されること' do
    within "#anime-#{anime1.id}" do
      expect(page).to have_content anime1.title
    end
    within "#anime-#{anime2.id}" do
      expect(page).to have_content anime2.title
    end
  end

  scenario 'アニメ一覧から詳細画面が表示されること' do
    within "#anime-#{anime1.id} .media-heading" do
      click_link anime1.title
    end

    expect(current_path).to eq admin_anime_path(id: anime1.id)
    expect(page).to have_content anime1.title
    expect(page).to have_content anime1.summary
    expect(page).to have_content anime1.wiki_url
    expect(page).to have_selector("img[alt='#{anime1.title}'")
  end

  scenario '詳細画面のタイトルでタイトルを編集できること' do
    visit admin_anime_path(id: anime1.id)

    expect(page).to have_content anime1.title
    find('.not-editing-title > span.link').click
    fill_in 'title', with: 'アニメのタイトル'
    find("input[name='title']").native.send_keys(:return)

    expect(page).not_to have_content anime1.title
    expect(page).to have_content 'アニメのタイトル'
    expect(anime1.reload.title).to eq 'アニメのタイトル'
  end

  scenario '詳細画面でアニメ詳細情報を編集できること' do
    visit admin_anime_path(id: anime1.id)

    find('.not-editing-body > div > span.link').click
    fill_in 'summary', with: 'アニメのあらすじ'
    fill_in 'wiki-url', with: 'http://xxx.sample.com'
    click_button '更新'

    expect(page).not_to have_content anime1.summary
    expect(page).not_to have_content anime1.wiki_url
    expect(page).to have_content 'アニメのあらすじ'
    expect(page).to have_content 'http://xxx.sample.com'
    anime1.reload
    expect(anime1.summary).to eq 'アニメのあらすじ'
    expect(anime1.wiki_url).to eq 'http://xxx.sample.com'
  end

  context 'シーズンが登録されていた場合' do
    let!(:season1) { create(:season, anime: anime1) }
    let!(:season2) { create(:season, anime: anime1) }
    let!(:season3) { create(:season, anime: anime2) }

    scenario 'アニメ詳細画面でシーズン一覧が表示されること' do
      visit admin_anime_path(id: anime1.id)

      within '.adminAnimeSeasonsComponent' do
        expect(page).to have_content season1.name
        expect(page).to have_content season2.name
        expect(page).not_to have_content season3.name
      end
    end
  end
end

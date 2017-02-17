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
    expect(page).to have_css "img[src='#{anime1.picture}'"
  end
end

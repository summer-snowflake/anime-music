# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  scenario 'アニメ一覧が表示されること' do
    visit admin_animes_path

    within "#anime-#{anime1.id}" do
      expect(page).to have_content anime1.title
      expect(page).not_to have_content anime2.title
    end
  end

  scenario 'アニメ詳細画面が表示されること' do
    visit "admin/animes/#{actor1.id}"

    expect(current_path).to eq admin_anime_path(id: anime1.id)
    within '.panel-heading' do
      expect(page).to have_content anime1.title
    end
  end
end

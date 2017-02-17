# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  scenario 'アニメ一覧が表示されること' do
    visit admin_animes_path

p anime1
p anime2
    expect(page).to have_content anime1.title
    expect(page).to have_content anime2.title
  end

  scenario 'アニメ詳細画面が表示されること' do
    visit "admin/animes/#{anime1.id}"

    expect(current_path).to eq admin_anime_path(id: anime1.id)
    expect(page).to have_content anime1.title
  end
end

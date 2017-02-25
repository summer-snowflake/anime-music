# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    visit admin_animes_path
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
end

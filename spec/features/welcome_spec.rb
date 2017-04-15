# frozen_string_literal: true

require 'rails_helper'

feature 'トップページ', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }
  let!(:season1) { create(:season, anime: anime1) }
  let!(:season2) { create(:season, anime: anime2) }

  background do
    visit root_path
  end

  scenario 'アニメ一覧が表示されること' do
    expect(page).to have_content anime1.title
    expect(page).to have_content anime2.title
  end
end

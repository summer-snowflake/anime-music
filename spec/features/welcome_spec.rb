require 'rails_helper'

feature 'トップページ', js: true do
  let!(:anime) { create(:anime) }

  background do
    visit root_path
  end

  scenario 'アニメ一覧が表示されること' do
    expect(page).to have_content anime.title
  end
end

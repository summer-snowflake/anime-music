require 'rails_helper'

feature '管理画面：アニメ一覧', js: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    visit admin_animes_path
  end

  scenario 'アニメ一覧が表示されること' do
    wait_for_ajax
    within "#anime-#{anime1.id}" do
      expect(page).to have_content anime1.title
      expect(page).not_to have_content anime2.title
    end
  end

  scenario '声優一覧から詳細画面が表示されること' do
    wait_for_ajax
    within "#anime-#{anime1.id}" do
      click_on anime1.title
    end

    expect(current_path).to eq admin_anime_path(id: anime1.id)
    within '.panel-heading' do
      expect(page).to have_content anime1.title 
    end
  end
end

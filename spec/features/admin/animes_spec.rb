require 'rails_helper'

feature '管理画面：アニメ一覧', js: true do
  let!(:anime) { create(:anime) }

  background do
    visit admin_animes_path
  end

  scenario 'アニメ一覧が表示されること' do
    wait_for_ajax
    expect(page).to have_content anime.title
  end
end

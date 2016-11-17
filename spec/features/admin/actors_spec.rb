require 'rails_helper'

feature '管理画面：声優一覧', js: true do
  let!(:actor) { create(:actor) }

  background do
    visit admin_actors_path
  end

  scenario '声優一覧が表示されること' do
    wait_for_ajax
    expect(page).to have_content actor.name
  end
end

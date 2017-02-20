# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：声優', js: true do
  let!(:actor1) { create(:actor) }
  let!(:actor2) { create(:actor) }

  background do
    visit admin_actors_path
  end

  scenario '声優一覧が表示されること' do
    within "#actor-#{actor1.id}" do
      expect(page).to have_content actor1.name
      expect(page).not_to have_content actor2.name
    end
    within "#actor-#{actor2.id}" do
      expect(page).to have_content actor2.name
      expect(page).not_to have_content actor1.name
    end
  end

  scenario '声優名から声優詳細画面が表示されること' do
    within "#actor-#{actor1.id}" do
      click_link actor1.name
    end

    expect(current_path).to eq admin_actor_path(id: actor1.id)
    within '.panel-heading' do
      expect(page).to have_content actor1.name
    end
  end
end
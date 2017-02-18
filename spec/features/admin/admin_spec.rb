# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：TOP', js: true do
  background do
    visit admin_top_path
  end

  scenario '管理TOPが表示されること' do
    expect(current_path).to eq admin_top_path
  end

  scenario '管理メニューが表示されること' do
    within '.adminMenuComponent' do
      expect(page).to have_content '管理TOP'
      expect(page).to have_content 'アニメ'
      expect(page).to have_content '声優'
    end
  end

  scenario 'メニューからTOP画面が表示されること' do
    within '.navbarComponent' do
      click_link 'TOP'
      expect(current_path).to eq root_path
    end
  end

  scenario '管理メニューから管理TOP画面が表示されること' do
    within '.adminMenuComponent' do
      click_link '管理TOP'
      expect(current_path).to eq admin_top_path
    end
  end

  scenario '管理メニューからアニメ一覧画面が表示されること' do
    within '.adminMenuComponent' do
      click_link 'アニメ'
      expect(current_path).to eq admin_animes_path
    end
  end

  scenario '管理メニューから声優一覧画面が表示されること' do
    within '.adminMenuComponent' do
      click_link '声優'
      expect(current_path).to eq admin_actors_path
    end
  end
end

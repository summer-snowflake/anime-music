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
end

# frozen_string_literal: true
require 'rails_helper'

feature '管理画面：TOP', js: true do
  background do
    visit admin_top_path
  end

  scenario '管理TOPが表示されること' do
    pending 'there is not jQuery'
    expect(current_path).to eq admin_top_path
  end
end

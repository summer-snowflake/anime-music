# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：曲', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:melody) { create(:melody, :with_season, title: '曲のタイトル') }

  background do
    login(user)
    visit admin_melody_path(id: melody.id)
  end

  scenario '曲の詳細情報を表示できること' do
    expect(page).to have_content '曲のタイトル'
    expect(page).to have_content melody.singer.name
    expect(page).to have_content melody.lyric_writer
    expect(page).to have_content melody.composer
    expect(page).to have_content melody.adapter
    expect(page).to have_content melody.memo
  end

  after do
    logout
  end
end

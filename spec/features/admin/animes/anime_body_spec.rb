# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：アニメ', js: true do
  let!(:user) { create(:user, :registered, :admin_user) }
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  background do
    login(user)
    visit admin_anime_path(id: anime1.id)
  end

  scenario '詳細画面でアニメ詳細情報を編集できること' do
    find('.not-editing-body > div > span.link').click
    fill_in 'summary', with: 'アニメのあらすじ'
    fill_in 'wiki-url', with: 'http://xxx.sample.com'
    find('.btn-danger').click

    expect(page).not_to have_content anime1.summary
    expect(page).not_to have_content anime1.wiki_url
    expect(page).to have_content 'アニメのあらすじ'
    expect(page).to have_content 'http://xxx.sample.com'
    anime1.reload
    expect(anime1.summary).to eq 'アニメのあらすじ'
    expect(anime1.wiki_url).to eq 'http://xxx.sample.com'
  end

  scenario '詳細画面でアニメ詳細情報を空で登録できること' do
    find('.not-editing-body > div > span.link').click
    fill_in 'summary', with: ' '
    find("textarea[name='summary']").native.send_keys(:backspace)
    fill_in 'wiki-url', with: ' '
    expect(find("textarea[name='summary']").value).to eq ''
    find("input[name='wiki-url']").native.send_keys(:backspace)
    expect(find("input[name='wiki-url']").value).to eq ''
    find('.btn-danger').click

    expect(page).not_to have_content anime1.summary
    expect(page).not_to have_content anime1.wiki_url
    anime1.reload
    expect(anime1.summary).to eq ''
    expect(anime1.wiki_url).to eq ''
  end

  after do
    logout
  end
end

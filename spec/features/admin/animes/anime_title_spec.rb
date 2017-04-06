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

  scenario '詳細画面のタイトルでタイトルを編集できること' do
    expect(page).to have_content anime1.title
    find('.not-editing-title > span.link').click
    fill_in 'title', with: 'アニメのタイトル'
    find("input[name='title']").native.send_keys(:return)

    expect(page).not_to have_content anime1.title
    expect(page).to have_content 'アニメのタイトル'
    expect(find('.alert-success')).to be_visible

    expect(anime1.reload.title).to eq 'アニメのタイトル'
  end

  scenario '詳細画面のタイトルで空のタイトルに変更できないこと' do
    old_title = anime1.title
    expect(page).to have_content old_title
    find('.not-editing-title > span.link').click
    fill_in 'title', with: ' '
    find("input[name='title']").native.send_keys(:backspace)
    expect(find("input[name='title']").value).to eq ''
    find("input[name='title']").native.send_keys(:return)
    expect(find('.alert-danger')).to be_visible

    expect(anime1.reload.title).to eq old_title
  end

  scenario '詳細途中のタイトルのフォーカスを外してからフォーカスすると編集途中に戻ること' do
    old_title = anime1.title
    expect(page).to have_content old_title

    find('.not-editing-title > span.link').click
    fill_in 'title', with: '編集途中のアニメタイトル'
    find('.adminAnimeTitleComponent').click
    expect(find('b.panel-title').text).to eq old_title
    find('.not-editing-title > span.link').click
    expect(find("input[name='title']").value).to eq '編集途中のアニメタイトル'
  end

  after do
    logout
  end
end

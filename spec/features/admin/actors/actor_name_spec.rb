# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：声優', js: true do
  let!(:actor1) { create(:actor) }
  let!(:actor2) { create(:actor) }

  background do
    visit admin_actor_path(id: actor1.id)
  end

  scenario '詳細画面のタイトルでタイトルを編集できること' do
    expect(page).to have_content actor1.name
    find('.not-editing-title > span.link').click
    fill_in 'name', with: '声優名'
    find("input[name='name']").native.send_keys(:return)

    expect(page).not_to have_content actor1.name
    expect(page).to have_content '声優名'
    expect(find('.alert-success')).to be_visible

    expect(actor1.reload.name).to eq '声優名'
  end

  scenario '詳細画面のタイトルで空のタイトルに変更できないこと' do
    old_name = actor1.name
    expect(page).to have_content old_name
    find('.not-editing-title > span.link').click
    fill_in 'name', with: ' '
    find("input[name='name']").native.send_keys(:backspace)
    expect(find("input[name='name']").value).to eq ''
    find("input[name='name']").native.send_keys(:return)
    expect(find('.alert-danger')).to be_visible

    expect(actor1.reload.name).to eq old_name
  end

  scenario '詳細途中のタイトルのフォーカスを外してからフォーカスすると編集途中に戻ること' do
    old_name = actor1.name
    expect(page).to have_content old_name

    find('.not-editing-title > span.link').click
    fill_in 'name', with: '編集途中の声優名'
    find('.adminActorTitleComponent').click
    expect(find('b.panel-title').text).to eq old_name
    find('.not-editing-title > span.link').click
    expect(find("input[name='name']").value).to eq '編集途中の声優名'
  end
end

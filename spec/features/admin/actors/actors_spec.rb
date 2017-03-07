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

  scenario '正しい値と「登録」ボタンで、声優を新規作成できること' do
    within '.adminActorNewFormComponent' do
      find('.btn-default').click
      fill_in 'name', with: '新しい 声優名'
      find('.btn-danger').click
      expect(page).to have_content '登録しました'
    end

    expect(Actor.last.name).to eq '新しい 声優名'
  end

  scenario '正しい値と「キャンセル」ボタンで、アニメが登録されないこと' do
    within '.adminActorNewFormComponent' do
      find('.btn-default').click
      fill_in 'name', with: '新しい 声優名'
      find('.btn-default').click
    end

    expect(Actor.count).to eq 2
  end

  scenario '不正な値と「登録」ボタンで、アニメが登録されないこと' do
    within '.adminActorNewFormComponent' do
      find('.btn-default').click
      fill_in 'name', with: ''
      find('.btn-danger').click
      expect(page).to have_content '声優名を入力してください'
    end

    expect(Actor.count).to eq 2
  end
end
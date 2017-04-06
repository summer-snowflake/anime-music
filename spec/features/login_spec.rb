# frozen_string_literal: true

require 'rails_helper'

feature 'ログイン画面', js: true do
  background do
    visit login_path
  end

  context '登録済みの管理ユーザー' do
    let!(:user) { create(:user, :admin_user, :registered) }

    scenario '管理ユーザーでログインできること' do
      login(user)

      # NOTE: 一度クリックすることでブラウザのエラーを解消
      find('.glyphicon-cog').click
      expect(current_path).to eq admin_top_path
      logout
    end

    scenario 'メールアドレスが空の場合、エラーメッセージが表示されログインできないこと' do
      fill_in 'email', with: ''
      fill_in 'password', with: user.password
      find('.btn-danger').click

      expect(page).to have_content 'メールアドレスを入力してください'
      expect(current_path).to eq login_path
    end
  end

  context '登録されていない管理ユーザー' do
    let!(:user) { create(:user, :admin_user) }

    scenario 'エラーメッセージが表示されログインできないこと' do
      fill_in 'email', with: user.email
      fill_in 'password', with: user.password
      find('.btn-danger').click
      sleep 1

      expect(current_path).to eq login_path
    end
  end
end

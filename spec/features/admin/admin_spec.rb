# frozen_string_literal: true

require 'rails_helper'

feature '管理画面：TOP', js: true do
  shared_examples 'access to admin page' do
    context '管理TOP' do
      let(:target_url) { admin_top_path }

      it_behaves_like 'redirect to login page'
    end

    context 'アニメ一覧画面' do
      let(:target_url) { admin_animes_path }

      it_behaves_like 'redirect to login page'
    end

    context 'アニメ詳細画面' do
      let!(:anime) { create(:anime) }
      let(:target_url) { admin_animes_path(anime: anime) }

      it_behaves_like 'redirect to login page'
    end

    context '声優一覧画面' do
      let(:target_url) { admin_actors_path }

      it_behaves_like 'redirect to login page'
    end

    context 'アニメ詳細画面' do
      let!(:actor) { create(:actor) }
      let(:target_url) { admin_actors_path(actor: actor) }

      it_behaves_like 'redirect to login page'
    end
  end

  shared_examples 'redirect to login page' do
    scenario 'ログイン画面が表示されること' do
      expect(current_path).to eq login_path
    end
  end

  context '管理者でログインしている場合' do
    let!(:user) { create(:user, :registered, :admin_user) }

    background do
      login(user)
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
        find('.brand-image').click
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

    after do
      logout
    end
  end

  context '一般ユーザーでログインしている場合' do
    let!(:user) { create(:user, :registered) }

    background do
      login(user)
      visit target_url
      sleep 1
    end

    it_behaves_like 'access to admin page'

    after do
      logout
    end
  end

  context 'ログインしていない場合' do
    background do
      visit target_url
      sleep 1
    end

    it_behaves_like 'access to admin page'
  end
end

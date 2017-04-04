# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/user', autodoc: true do
  let(:email) { 'user@example.com' }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get '/api/user'
      expect(response.status).to eq 401
    end
  end

  context '一般ユーザーでログインしている場合' do
    let!(:user) { create(:user, :registered, email: email) }

    it '200とログインユーザの情報が返ってくること' do
      get '/api/user', headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        email: email,
        admin: false
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context '管理者ユーザーでログインしている場合' do
    let!(:user) { create(:user, :registered, :admin_user, email: email) }

    it '200とログインユーザの情報が返ってくること' do
      get '/api/user', headers: login_headers(user)
      expect(response.status).to eq 200

      json = {
        email: email,
        admin: true
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

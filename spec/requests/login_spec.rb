# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/session?email=email&password=password', autodoc: true do
  let(:email) { 'login@example.com' }
  let(:password) { 'password' }
  let!(:user) do
    create(:user, :registered,
           email: 'login@example.com',
           password: 'password', password_confirmation: 'password')
  end
  let!(:params) { { email: email, password: password } }

  context 'ユーザーの本登録が完了している場合' do
    it '200が返ってくること' do
      post '/api/session', params: params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['access_token']).to be_a(String)

      json = {
        user: {
          id: user.id,
          email: email,
          admin: false
        }
      }
      expect(response.body).to be_json_including(json)
    end
  end

  context 'ユーザーの本登録が完了していない場合' do
    before do
      user.status = :inactive
      user.save
    end

    it '401とエラーメッセージが返ってくること' do
      post '/api/session', params: params

      expect(response.status).to eq 401
      json = {
        error_messages: ['メールアドレスまたはパスワードが正しくありません']
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'ユーザーが見つからない場合' do
    let(:email) { 'dummy@example.com' }

    it '401とエラーメッセージが返ってくること' do
      post '/api/session', params: params

      expect(response.status).to eq 401
      json = {
        error_messages: ['メールアドレスまたはパスワードが正しくありません']
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'パスワードが不正な場合' do
    let(:password) { 'dummy_password' }

    it '401とエラーメッセージが返ってくること' do
      post '/api/session', params: params

      expect(response.status).to eq 401
      json = {
        error_messages: ['メールアドレスまたはパスワードが正しくありません']
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'メールアドレスが空の場合' do
    let(:email) { '' }

    it '401とエラーメッセージが返ってくること' do
      post '/api/session', params: params

      expect(response.status).to eq 401
      json = {
        error_messages: ['メールアドレスを入力してください']
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'メールアドレスとパスワードが空の場合' do
    let(:email) { '' }
    let(:password) { '' }

    it '401とエラーメッセージが返ってくること' do
      post '/api/session', params: params

      expect(response.status).to eq 401
      json = {
        error_messages: %w[メールアドレスを入力してください パスワードを入力してください]
      }
      expect(response.body).to be_json_as(json)
    end
  end

  context 'メールアドレスが正しい形式ではない場合' do
    let(:email) { 'abcde' }

    it '401とエラーメッセージが返ってくること' do
      post '/api/session', params: params

      expect(response.status).to eq 401
      json = {
        error_messages: ['メールアドレスは不正な値です']
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

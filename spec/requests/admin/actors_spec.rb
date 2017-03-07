# frozen_string_literal: true
require 'rails_helper'

describe 'GET /api/admin/actors', autodoc: true do
  let!(:actor1) { create(:actor) }
  let!(:actor2) { create(:actor) }

  it '200とアニメ一覧が返ってくること' do
    get '/api/admin/actors'
    expect(response.status).to eq 200

    json = {
      actors: [
        {
          id: actor2.id,
          name: actor2.name
        },
        {
          id: actor1.id,
          name: actor1.name
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

describe 'GET /api/admin/actors/:id', autodoc: true do
  let!(:actor) { create(:actor) }

  it '200とアニメ詳細が返ってくること' do
    get "/api/admin/actors/#{actor.id}"
    expect(response.status).to eq 200

    json = {
      id: actor.id,
      name: actor.name
    }
    expect(response.body).to be_json_as(json)
  end
end

describe 'POST /api/admin/actors', autodoc: true do
  context '正しい値を設定した場合' do
    let!(:params) do
      { actor: { name: '声優 名前' } }
    end

    it '201が返ってくること' do
      post '/api/admin/actors', params: params
      expect(response.status).to eq 201
      actor = Actor.last
      expect(actor.name).to eq '声優 名前'
    end
  end

  context '声優名を空で設定した場合' do
    let!(:params) do
      { actor: { name: '' } }
    end

    it '422とエラーメッセージが返ってくること' do
      post '/api/admin/actors', params: params
      expect(response.status).to eq 422

      json = {
        error_messages: ['声優名を入力してください']
      }
      expect(response.body).to be_json_as(json)
    end
  end
end

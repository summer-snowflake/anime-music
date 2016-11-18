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
          id: actor1.id,
          name: actor1.name
        },
        {
          id: actor2.id,
          name: actor2.name
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

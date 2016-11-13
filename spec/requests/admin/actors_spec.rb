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

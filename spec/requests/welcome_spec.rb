# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/welcome', autodoc: true do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  it '200とアニメ一覧が返ってくること' do
    get '/api/welcome'
    expect(response.status).to eq 200

    json = {
      animes: [
        {
          id: anime1.id,
          title: anime1.title,
          summary: anime1.summary
        },
        {
          id: anime2.id,
          title: anime2.title,
          summary: anime2.summary
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

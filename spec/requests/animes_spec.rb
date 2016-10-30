# frozen_string_literal: true
require 'rails_helper'

describe 'GET /api/animes' do
  let!(:anime1) { create(:anime) }
  let!(:anime2) { create(:anime) }

  it '200とアニメ一覧が返ってくること' do
    get '/api/animes'
    expect(response.status).to eq 200

    json = {
      animes: [
        {
          id: anime1.id,
          title: anime1.title
        },
        {
          id: anime2.id,
          title: anime2.title
        }
      ]
    }
    expect(response.body).to be_json_as(json)
  end
end

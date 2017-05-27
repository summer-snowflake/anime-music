# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/melodies/:melody_id/melody_images', autodoc: true do
  let!(:season) { create(:season) }
  let!(:ed_melody) { create(:melody, season: season, kind: :ed) }
  let!(:melody_image1) { create(:melody_image, melody: ed_melody) }
  let!(:melody_image2) { create(:melody_image, melody: ed_melody) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/melodies/#{ed_melody.id}/melody_images"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context 'kindの指定がない場合' do
      it '200と曲一覧が返ってくること' do
        get "/api/admin/melodies/#{ed_melody.id}/melody_images",
            headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          melody_images: [
            {
              id: melody_image1.id,
              picture: melody_image1.picture.url
            },
            {
              id: melody_image2.id,
              picture: melody_image2.picture.url
            }
          ]
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

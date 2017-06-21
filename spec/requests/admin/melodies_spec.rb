# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/seasons/1/melodies', autodoc: true do
  let!(:anime) { create(:anime) }
  let!(:season) { create(:season, anime: anime) }
  let!(:singer) { create(:singer) }
  let!(:op_melody) do
    create(:melody, season: season, kind: :op, singer: singer)
  end
  let!(:ed_melody) { create(:melody, season: season, kind: :ed) }
  let!(:advertisement) { create(:advertisement, melody: op_melody) }
  let!(:melody_image) { create(:melody_image, melody: ed_melody) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      get "/api/admin/seasons/#{season.id}/melodies"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context 'kindの指定がない場合' do
      it '200と曲一覧が返ってくること' do
        get "/api/admin/seasons/#{season.id}/melodies",
            headers: login_headers(user)
        expect(response.status).to eq 200

        json = {
          melodies: [
            {
              id: op_melody.id,
              season_id: op_melody.season.id,
              title: op_melody.title,
              singer_name: singer.name,
              lyric_writer: op_melody.lyric_writer,
              composer: op_melody.composer,
              adapter: op_melody.adapter,
              memo: op_melody.memo,
              kind: op_melody.kind,
              youtube: op_melody.youtube,
              advertisements: [
                {
                  id: advertisement.id,
                  body: advertisement.body
                }
              ],
              draft: false,
              melody_images: []
            },
            {
              id: ed_melody.id,
              season_id: ed_melody.season.id,
              title: ed_melody.title,
              singer_name: ed_melody.singer.name,
              lyric_writer: ed_melody.lyric_writer,
              composer: ed_melody.composer,
              adapter: ed_melody.adapter,
              memo: ed_melody.memo,
              kind: ed_melody.kind,
              youtube: ed_melody.youtube,
              advertisements: [],
              draft: false,
              melody_images: [
                id: melody_image.id,
                picture: melody_image.picture.url
              ]
            }
          ]
        }
        expect(response.body).to be_json_as(json)
      end
    end
  end
end

describe 'POST /api/admin/seasons/:season_id/melodies', autodoc: true do
  let(:melody_title) { '音楽タイトル' }
  let!(:season) { create(:season) }
  let(:params) do
    { melody: attributes_for(:melody, title: melody_title, memo: 'めも') }
  end

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      post "/api/admin/seasons/#{season.id}/melodies"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context '正しい値を設定した場合' do
      it '201が返ってくること' do
        post "/api/admin/seasons/#{season.id}/melodies",
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201

        melody = season.melodies.last
        expect(melody.title).to eq '音楽タイトル'
        expect(melody.memo).to eq 'めも'
      end
    end

    context 'タイトルを空で設定した場合' do
      let(:melody_title) { '' }

      it '422とエラーメッセージが返ってくること' do
        post "/api/admin/seasons/#{season.id}/melodies",
             params: params, headers: login_headers(user)
        expect(response.status).to eq 422

        json = {
          error_messages: ['タイトルを入力してください']
        }
        expect(response.body).to be_json_as(json)
      end
    end

    context 'Singerデータにある「歌」を登録した場合' do
      let(:singer) { create(:singer) }
      let(:params) do
        { melody: attributes_for(
          :melody, title: melody_title, singer_name: singer.name
        ) }
      end

      it '201が返ってくること' do
        post "/api/admin/seasons/#{season.id}/melodies",
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201

        melody = season.melodies.last
        expect(melody.title).to eq '音楽タイトル'
        expect(melody.singer).to eq singer
      end
    end

    context 'Singerデータにない「歌」を登録した場合' do
      let(:singer_name) { 'シンガーの名前' }
      let(:params) do
        { melody: attributes_for(
          :melody, title: melody_title, singer_name: singer_name
        ) }
      end

      it '201が返ってくること' do
        post "/api/admin/seasons/#{season.id}/melodies",
             params: params, headers: login_headers(user)
        expect(response.status).to eq 201

        melody = season.melodies.last
        expect(melody.title).to eq '音楽タイトル'
        expect(melody.singer).to eq Singer.last
      end
    end
  end
end

describe 'PATCH /api/admin/seasons/:season_id/melodies/:id', autodoc: true do
  let!(:season) { create(:season) }
  let!(:melody) { create(:melody, season: season) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      patch "/api/admin/seasons/#{season.id}/melodies/#{melody.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    context '正しい値を設定していた場合' do
      let!(:params) { { melody: attributes_for(:melody) } }

      it '200が返ってくること' do
        patch "/api/admin/seasons/#{season.id}/melodies/#{melody.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 200
      end
    end

    context 'シーズンの期を設定していなかった場合' do
      let!(:params) { { melody: attributes_for(:melody, title: '') } }

      it '422とエラーメッセージが返ってくること' do
        patch "/api/admin/seasons/#{season.id}/melodies/#{melody.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 422

        json = {
          error_messages: ['タイトルを入力してください']
        }
        expect(response.body).to be_json_as(json)
      end
    end

    context 'Singerデータにある「歌」に更新した場合' do
      let(:singer) { create(:singer) }
      let(:params) do
        { melody: attributes_for(:melody, singer_name: singer.name) }
      end

      it '200が返ってくること' do
        patch "/api/admin/seasons/#{season.id}/melodies/#{melody.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 200

        melody = season.melodies.last
        expect(melody.singer).to eq singer
      end
    end

    context 'Singerデータにない「歌」を登録した場合' do
      let(:singer_name) { 'シンガーの名前' }
      let(:params) do
        { melody: attributes_for(:melody, singer_name: singer_name) }
      end

      it '200が返ってくること' do
        patch "/api/admin/seasons/#{season.id}/melodies/#{melody.id}",
              params: params, headers: login_headers(user)
        expect(response.status).to eq 200

        melody = season.melodies.last
        expect(melody.singer).to eq Singer.last
      end
    end
  end
end

describe 'DELETE /api/admin/seasons/:season_id/melodies/:id', autodoc: true do
  let!(:season) { create(:season) }
  let!(:melody) { create(:melody, season: season) }

  context 'ログインしていない場合' do
    it '401が返ってくること' do
      delete "/api/admin/seasons/#{season.id}/melodies/#{melody.id}"
      expect(response.status).to eq 401
    end
  end

  context 'ログインしている場合' do
    let!(:user) { create(:user, :registered) }

    it '200が返ってくること' do
      delete "/api/admin/seasons/#{season.id}/melodies/#{melody.id}",
             headers: login_headers(user)
      expect(response.status).to eq 200
    end
  end
end

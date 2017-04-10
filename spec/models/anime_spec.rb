# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Anime, type: :model do
  it { is_expected.to have_many(:seasons) }
  it { is_expected.to have_many(:melodies) }
  it { is_expected.to have_many(:appearances) }
  it { is_expected.to have_many(:advertisements) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(250) }
    it { is_expected.to validate_length_of(:summary).is_at_most(250) }
    it { is_expected.to validate_length_of(:wiki_url).is_at_most(250) }
  end

  describe '#current_airing' do
    subject { Anime.current_airing_animes }

    let(:anime1) { create(:anime) }
    let(:anime2) { create(:anime) }
    let!(:season1) { create(:season, anime: anime1) }

    context 'not seasons' do
      let!(:season2) do
        create(:season, anime: anime2, end_on: Time.zone.yesterday)
      end

      it { is_expected.to eq [anime1] }
    end

    context 'during seasons' do
      let!(:season2) { create(:season, anime: anime2) }

      it { is_expected.to eq [anime1, anime2] }
    end
  end
end

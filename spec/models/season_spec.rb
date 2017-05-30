# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Season, type: :model do
  it { is_expected.to belong_to(:anime) }
  it { is_expected.to have_many(:melodies).dependent(:destroy) }
  it { is_expected.to have_many(:advertisements).dependent(:destroy) }

  describe 'バリデーション' do
    subject { create(:season) }

    it { is_expected.to validate_presence_of(:phase) }
    it { is_expected.to validate_uniqueness_of(:phase).scoped_to(:anime_id) }
    it { is_expected.to validate_length_of(:behind_name).is_at_most(250) }
    it { is_expected.to validate_length_of(:previous_name).is_at_most(250) }
  end

  describe '#airing' do
    subject { Season.airing(Time.zone.today) }

    let(:anime1) { create(:anime) }
    let(:anime2) { create(:anime) }
    let!(:season1) { create(:season, anime: anime1) }

    context 'not seasons' do
      let!(:season2) do
        create(:season, anime: anime2, end_on: Time.zone.yesterday)
      end

      it { is_expected.to eq [season1] }
    end

    context 'during seasons' do
      let!(:season2) { create(:season, anime: anime2) }

      it { is_expected.to eq [season1, season2] }
    end
  end
end

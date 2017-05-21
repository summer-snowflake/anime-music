# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Anime, type: :model do
  it { is_expected.to have_many(:seasons).dependent(:destroy) }
  it { is_expected.to have_many(:melodies).dependent(:destroy) }
  it { is_expected.to have_many(:appearances).dependent(:destroy) }
  it { is_expected.to have_many(:advertisements).dependent(:destroy) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(250) }
    it { is_expected.to validate_length_of(:summary).is_at_most(50_000) }
    it { is_expected.to validate_length_of(:wiki_url).is_at_most(250) }
  end

  describe 'airing?' do
    let!(:anime) { create(:anime) }
    subject { anime.airing? }

    context 'not seasons' do
      it { is_expected.to be_falsey }
    end

    context 'during seasons' do
      let!(:season) { create(:season, anime: anime) }

      it { is_expected.to be_truthy }
    end
  end
end

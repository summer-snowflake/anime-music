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
end

require 'rails_helper'

RSpec.describe Anime, type: :model do
  it { is_expected.to have_many(:seasons) }
  it { is_expected.to have_many(:melodies) }
  it { is_expected.to have_many(:appearances) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:title) }
  end
end

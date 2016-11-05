require 'rails_helper'

RSpec.describe Actor, type: :model do
  it { is_expected.to have_many(:appearances) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:name) }
  end
end

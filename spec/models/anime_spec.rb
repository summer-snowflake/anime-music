require 'rails_helper'

RSpec.describe Anime, type: :model do
  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:title) }
  end
end

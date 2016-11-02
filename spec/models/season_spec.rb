require 'rails_helper'

RSpec.describe Season, type: :model do
  it { is_expected.to belong_to(:anime) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:name) }
  end
end

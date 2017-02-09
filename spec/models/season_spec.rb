# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Season, type: :model do
  it { is_expected.to belong_to(:anime) }
  it { is_expected.to have_many(:melodies) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:phase) }
  end
end

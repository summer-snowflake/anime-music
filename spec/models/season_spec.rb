# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Season, type: :model do
  it { is_expected.to belong_to(:anime) }
  it { is_expected.to have_many(:melodies) }

  describe 'バリデーション' do
    subject { create(:season) }

    it { is_expected.to validate_presence_of(:phase) }
    it { is_expected.to validate_uniqueness_of(:phase).scoped_to(:anime_id) }
    it { is_expected.to validate_length_of(:name).is_at_most(250) }
  end
end

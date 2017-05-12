# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Melody, type: :model do
  it { is_expected.to belong_to(:anime) }
  it { is_expected.to belong_to(:season) }
  it { is_expected.to belong_to(:singer) }
  it { is_expected.to have_many(:advertisements) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:kind) }
  end
end

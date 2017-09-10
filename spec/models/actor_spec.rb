# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Actor, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  it { is_expected.to have_many(:appearances).dependent(:destroy) }
  it { is_expected.to have_many(:advertisements).dependent(:destroy) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:name) }
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Singer, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  it { is_expected.to have_many(:melodies) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:name) }
  end
end

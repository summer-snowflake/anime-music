# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MelodyImage, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  it { is_expected.to belong_to(:melody) }

  describe 'validation' do
    it { is_expected.to validate_presence_of(:picture) }
  end
end

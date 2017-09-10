# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(10) }
  end
end

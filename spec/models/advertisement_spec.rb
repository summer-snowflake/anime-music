# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Advertisement, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  it { is_expected.to belong_to(:anime) }
  it { is_expected.to belong_to(:actor) }
  it { is_expected.to belong_to(:season) }
  it { is_expected.to belong_to(:melody) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:body) }
  end
end

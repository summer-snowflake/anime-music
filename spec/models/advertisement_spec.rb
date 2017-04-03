# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Advertisement, type: :model do
  it { is_expected.to belong_to(:anime) }
  it { is_expected.to belong_to(:actor) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:body) }
  end
end

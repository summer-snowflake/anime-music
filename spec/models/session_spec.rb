# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Session, type: :model do
  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to validate_length_of(:email).is_at_most(250) }
    it { is_expected.to validate_length_of(:password).is_at_most(250) }
  end
end

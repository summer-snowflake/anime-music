# frozen_string_literal: true
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:email) }
  end
end

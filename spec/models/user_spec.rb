# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to have_one(:admin) }

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:email) }
  end

  describe '#admin?' do
    context 'user is admin' do
      subject { create(:user, :admin_user).admin? }

      it { is_expected.to be_truthy }
    end

    context 'user is not admin' do
      subject { create(:user).admin? }

      it { is_expected.to be_falsey }
    end
  end
end

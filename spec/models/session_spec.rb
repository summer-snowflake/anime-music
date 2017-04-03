# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session, type: :model do
  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to validate_length_of(:password).is_at_most(250) }

    describe '#email' do
      it { is_expected.to validate_presence_of(:email) }
      it { is_expected.to validate_length_of(:email).is_at_most(250) }

      context 'invalid email format' do
        invalid_emails = ['invalid.@example.com', 'invalid@.com', 'invalid']
        invalid_emails.each do |invalid_email|
          it { is_expected.not_to allow_value(invalid_email).for(:email) }
        end
      end
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaggedSeason, type: :model do
  it { is_expected.to belong_to(:season) }
  it { is_expected.to belong_to(:season_tag).with_foreign_key('tag_id') }
 
  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:tag_id) }
    it { is_expected.to validate_presence_of(:season_id) }
  end
end

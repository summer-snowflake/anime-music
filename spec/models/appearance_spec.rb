# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Appearance, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  it { is_expected.to belong_to(:anime) }
  it { is_expected.to belong_to(:actor) }
end

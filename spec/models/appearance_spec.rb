require 'rails_helper'

RSpec.describe Appearance, type: :model do
  it { is_expected.to belong_to(:anime) }
  it { is_expected.to belong_to(:actor) }
end

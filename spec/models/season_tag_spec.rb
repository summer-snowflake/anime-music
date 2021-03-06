# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SeasonTag, type: :model do
  it_should_behave_like 'PaperTrail enabled'

  it do
    is_expected.to have_many(:tagged_seasons)
      .dependent(:destroy)
      .with_foreign_key('tag_id')
  end
end

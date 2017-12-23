# frozen_string_literal: true

FactoryBot.define do
  factory :tagged_season do
    season
    tag_id { create(:season_tag).id }
  end
end

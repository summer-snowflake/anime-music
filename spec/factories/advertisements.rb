# frozen_string_literal: true

FactoryGirl.define do
  factory :advertisement do
    anime
    trait :belongs_to_actor do
      anime_id { nil }
      actor
    end
    trait :belongs_to_season do
      anime_id { nil }
      season
    end
    sequence(:body) { |n| "<a href='https://url.com'>#{n}</a>" }
  end
end

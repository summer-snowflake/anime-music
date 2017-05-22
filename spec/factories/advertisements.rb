# frozen_string_literal: true

FactoryGirl.define do
  factory :advertisement do
    anime
    tag_name { %w[CD DVD Novels Comics].sample }
    trait :belongs_to_actor do
      anime_id { nil }
      actor
    end
    trait :belongs_to_season do
      anime_id { nil }
      season
    end
    trait :blongs_to_melody do
      anime_id { nil }
      melody
    end
    sequence(:body) { |n| "<a href='https://url.com'>#{n}</a>" }
  end
end

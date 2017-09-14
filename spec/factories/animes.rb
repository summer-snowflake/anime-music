# frozen_string_literal: true

FactoryGirl.define do
  factory :anime do
    sequence(:title) { |n| "アニメタイトル#{n}" }
    sequence(:summary) { |n| "あらすじ#{n}" }
    wiki_url Faker::Internet.url
    picture { fixture_file_upload('spec/fixtures/clover.gif', 'image/gif') }
    status { Anime.statuses.keys.sample }

    trait :unpublished do
      status :unpublished
    end
    trait :prepared do
      status :prepared
    end
    trait :published do
      status :published
    end
  end
end

# frozen_string_literal: true

FactoryBot.define do
  factory :anime do
    sequence(:title) { |n| "アニメタイトル#{n}" }
    sequence(:summary) { |n| "あらすじ#{n}" }
    wiki_url Faker::Internet.url
    picture { fixture_file_upload('spec/fixtures/clover.gif', 'image/gif') }
  end
end

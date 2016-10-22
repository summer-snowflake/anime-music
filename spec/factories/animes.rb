FactoryGirl.define do
  factory :anime do
    sequence(:title) { |n| "アニメタイトル#{n}" }
    sequence(:summary) { |n| "あらすじ#{n}" }
    wiki_url Faker::Internet.url
    picture Faker::Avatar.image
  end
end

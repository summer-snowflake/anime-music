FactoryGirl.define do
  factory :season do
    anime
    sequence(:name) { |n| "アニメタイトル#{n}" }
    start_on { Time.zone.today - 10.days }
    end_on { [Time.zone.today, nil].sample }
  end
end

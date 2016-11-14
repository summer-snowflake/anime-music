FactoryGirl.define do
  factory :season do
    anime
    sequence(:phase) { |n| "第#{n}期" }
    sequence(:name) { |n| "シーズン名#{n}" }
    start_on { Time.zone.today - 10.days }
    end_on { [Time.zone.today, nil].sample }
  end
end

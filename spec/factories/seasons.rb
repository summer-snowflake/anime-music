# frozen_string_literal: true

FactoryGirl.define do
  factory :season do
    anime
    sequence(:phase) { |n| n }
    sequence(:previous_name) { |n| "続#{n}" }
    sequence(:behind_name) { |n| "シーズン名#{n}" }
    start_on { Time.zone.today - 10.days }
    end_on { [Time.zone.today, nil].sample }
  end
end

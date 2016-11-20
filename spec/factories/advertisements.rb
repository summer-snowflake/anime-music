# frozen_string_literal: true
FactoryGirl.define do
  factory :advertisement do
    anime
    actor
    sequence(:body) { |n| "<a href='https://url.com'>#{n}</a>" }
  end
end

# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    trait :inactive do
      status :inactive
    end
    trait :registered do
      status :registered
    end
    password 'password'
  end
end

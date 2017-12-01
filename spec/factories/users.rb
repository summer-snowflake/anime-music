# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    trait :inactive do
      status :inactive
    end
    trait :registered do
      status :registered
    end
    password 'password'
    trait :admin_user do
      admin
    end
  end
end

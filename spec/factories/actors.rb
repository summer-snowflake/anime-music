# frozen_string_literal: true

FactoryBot.define do
  factory :actor do
    transient do
      gimei { Gimei.new }
    end
    name { "#{gimei.last.kanji} #{gimei.first.kanji}" }
  end
end

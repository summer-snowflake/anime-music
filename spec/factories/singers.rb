# frozen_string_literal: true

FactoryBot.define do
  factory :singer do
    transient do
      gimei { Gimei.new }
    end
    name { "#{gimei.first.kanji} #{gimei.last.kanji}" }
  end
end

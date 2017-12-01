# frozen_string_literal: true

FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| "タグ#{n}" }
    type 'SeasonTag'

    factory :season_tag, class: SeasonTag do
      sequence(:name) { |_n| "#{[*2008..2017].sample}年 #{%w[春 夏 秋 冬].sample}" }
      type 'SeasonTag'
    end
  end
end

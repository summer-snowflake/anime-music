# frozen_string_literal: true

FactoryBot.define do
  factory :melody do
    trait :with_anime do
      anime
    end
    trait :with_season do
      season
    end
    kind { %i[op ed].sample }
    trait :op do
      kind :op
    end
    trait :ed do
      kind :ed
    end
    sequence(:title) { |n| "曲名タイトル#{n}" }
    youtube do
      '<iframe width="560" height="315" \
      src="" frameborder="0" allowfullscreen></iframe>'
    end
    singer
    # TODO: 音楽データを設定する
    # music
    sequence(:lyric_writer) { |n| "作詞者#{n}" }
    sequence(:composer) { |n| "作曲家#{n}" }
    sequence(:adapter) { |n| "編曲者#{n}" }
    sequence(:memo) { |n| "メモ#{n}" }
    start_on { Time.zone.today - 6.months }
    end_on { Time.zone.today - 2.months }
    draft false
  end
end

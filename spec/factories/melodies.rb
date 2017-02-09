# frozen_string_literal: true
FactoryGirl.define do
  factory :melody do
    anime
    season
    kind { [:op, :ed].sample }
    sequence(:title) { |n| "曲名タイトル#{n}" }
    singer
    # TODO: 音楽データを設定する
    # music
    sequence(:lyric_writer) { |n| "作詞者#{n}" }
    sequence(:composer) { |n| "作曲家#{n}" }
    sequence(:adapter) { |n| "編曲者#{n}" }
    sequence(:memo) { |n| "メモ#{n}" }
    start_on { Time.zone.today - 6.months }
    end_on { Time.zone.today - 2.months }
  end
end

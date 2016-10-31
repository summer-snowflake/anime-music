FactoryGirl.define do
  factory :melody do
    anime
    season
    kind { [1..2].sample }
    sequence(:title) { |n| "シーズン#{n}" }
    # TODO: singerテーブル作成後設定
    # singer_id
    # TODO: 音楽データを設定する
    # music
    sequence(:lyric_writer) { |n| "作詞者#{n}" }
    sequence(:composer) { |n| "作曲家#{n}" }
    sequence(:adapter) { |n| "編曲者#{n}" }
    sequence(:memo) { |n| "メモ#{n}" }
    start_on Time.zone.today - 6.months.ago
    end_on Time.zone.today - 2.months.ago
  end
end

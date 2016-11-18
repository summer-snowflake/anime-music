FactoryGirl.define do
  factory :actor do
    transient do
      gimei { Gimei.new }
    end
    name { "#{gimei.last.kanji} #{gimei.first.kanji}" }
  end
end

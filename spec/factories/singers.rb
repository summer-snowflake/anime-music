FactoryGirl.define do
  factory :singer do
    transient do
      gimei { Gimei.new }
    end
    name { "#{gimei.first.kanji} #{gimei.last.kanji}" }
  end
end

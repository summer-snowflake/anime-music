# frozen_string_literal: true

class SeasonTag < Tag
  has_many :tagged_seasons, dependent: :destroy, foreign_key: 'tag_id'
end

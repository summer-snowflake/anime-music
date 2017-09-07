# frozen_string_literal: true

class TaggedSeason < ApplicationRecord
  validates :tag_id, :season_id, presence: true

  belongs_to :season_tag, foreign_key: 'tag_id'
  belongs_to :season
end

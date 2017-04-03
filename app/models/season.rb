# frozen_string_literal: true

class Season < ApplicationRecord
  belongs_to :anime
  has_many :melodies

  validates :phase,
            presence: true,
            uniqueness: { scope: :anime_id },
            numericality: { only_integer: true,
                            greater_than_or_equal_to: 1,
                            allow_nil: true }
  validates :name, length: { maximum: Settings.season.name.maximum_length }
end

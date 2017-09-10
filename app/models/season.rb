# frozen_string_literal: true

class Season < ApplicationRecord
  include OperatorAccessor

  belongs_to :anime
  has_many :melodies, dependent: :destroy
  has_many :advertisements, dependent: :destroy
  has_many :tagged_seasons, dependent: :destroy

  validates :phase,
            presence: true,
            uniqueness: { scope: :anime_id },
            numericality: { only_integer: true,
                            greater_than_or_equal_to: 1,
                            allow_nil: true }
  validates :previous_name, :behind_name,
            length: { maximum: Settings.season.name.maximum_length }

  def self.airing(date)
    where('seasons.start_on <= ?', date)
      .where('seasons.end_on >= ? or seasons.end_on is null', date)
  end

  def anime_advertisements
    Advertisement.where(id: anime.advertisements.pluck(:id).sample)
  end
end

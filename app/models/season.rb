# frozen_string_literal: true

class Season < ApplicationRecord
  belongs_to :anime
  has_many :melodies, dependent: :destroy
  has_many :advertisements, dependent: :destroy

  validates :phase,
            presence: true,
            uniqueness: { scope: :anime_id },
            numericality: { only_integer: true,
                            greater_than_or_equal_to: 1,
                            allow_nil: true }
  validates :name, length: { maximum: Settings.season.name.maximum_length }

  def self.airing(date)
    where('start_on <= ?', date).where('end_on >= ? or end_on is null', date)
  end

  def anime_advertisements
    Advertisement.where(id: anime.advertisements.pluck(:id).sample(2))
  end
end

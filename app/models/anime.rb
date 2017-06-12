# frozen_string_literal: true

class Anime < ApplicationRecord
  has_many :seasons, dependent: :destroy
  has_many :melodies, dependent: :destroy
  has_many :appearances, dependent: :destroy
  has_many :advertisements, dependent: :destroy

  validates :title,
            presence: true,
            length: { maximum: Settings.anime.title.maximum_length }
  validates :summary, length: { maximum: Settings.anime.summary.maximum_length }
  validates :wiki_url,
            length: { maximum: Settings.anime.wiki_url.maximum_length }

  mount_uploader :picture, PictureUploader

  def airing?
    seasons.any? do |season|
      if season.start_on.present?
        season.start_on <= Time.zone.today &&
          (season.end_on.nil? || season.end_on >= Time.zone.today)
      end
    end
  end

  def sample_advertisement
    advertisements.sample || Advertisement.new
  end

  def self.sample_airing_advertisement(date)
    Advertisement.where(anime_id: airing_ids(date)).sample || Advertisement.new
  end

  def self.airing_ids(date)
    Season.airing(date).pluck(:anime_id).uniq
  end

  private_class_method :airing_ids
end
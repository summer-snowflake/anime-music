# frozen_string_literal: true

class Anime < ApplicationRecord
  has_many :seasons
  has_many :melodies
  has_many :appearances
  has_many :advertisements

  validates :title,
            presence: true,
            length: { maximum: Settings.anime.title.maximum_length }
  validates :summary, length: { maximum: Settings.anime.summary.maximum_length }
  validates :wiki_url,
            length: { maximum: Settings.anime.wiki_url.maximum_length }

  def airing?
    seasons.any? do |season|
      if season.start_on.present?
        season.start_on <= Time.zone.today &&
          (season.end_on.nil? || season.end_on >= Time.zone.today)
      end
    end
  end
end

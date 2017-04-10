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

  def self.current_airing
    Anime
      .includes(:seasons)
      .where("seasons.start_on <= '#{Time.zone.today}'")
      .where("seasons.end_on >= '#{Time.zone.today}' or seasons.end_on is null")
      .references(:seasons)
  end
end

# frozen_string_literal: true

class WelcomeController < ApplicationController
  def show
    @seasons = Season.airing(Time.zone.today)
                     .includes(%i[anime melodies])
                     .where('melodies.draft = ?', false)
                     .references(:melodies)
                     .order(:id)
                     .order('melodies.kind asc')
    @anime_titles = @seasons.map { |s| s.anime.title }.join(', ')
    @advertisement = Anime.sample_airing_advertisement(Time.zone.today)
  end
end

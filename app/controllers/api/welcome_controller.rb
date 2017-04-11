# frozen_string_literal: true

class Api::WelcomeController < Api::BaseController
  def show
    @seasons = Season.airing(Time.zone.today).includes(:anime)
    # @animes = Anime.current_airing
  end
end

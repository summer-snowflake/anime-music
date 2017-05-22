# frozen_string_literal: true

class Api::AdvertisementsController < Api::BaseController
  before_action :set_season, only: %i[index]

  def index
    @advertisements =
      if @season
        @season.anime_advertisements
      else
        Anime.airing_advertisements(Time.zone.today)
      end
  end

  private

  def set_season
    @season = Season.find(params[:season_id]) if params[:season_id]
  end
end

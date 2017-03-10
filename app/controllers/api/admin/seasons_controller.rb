# frozen_string_literal: true
class Api::Admin::SeasonsController < Api::BaseController
  before_action :set_anime, only: %i(index create)

  def index
    @seasons = @anime.seasons
  end

  def create
    @season = @anime.seasons.new(season_params)
    if @season.save
      head :created
    else
      render_error @season
    end
  end

  private

  def set_anime
    @anime = Anime.find(params[:anime_id])
  end

  def season_params
    params.require(:season).permit(:phase, :name, :start_on, :end_on)
  end
end

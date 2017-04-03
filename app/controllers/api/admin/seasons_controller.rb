# frozen_string_literal: true

class Api::Admin::SeasonsController < Api::BaseController
  before_action :set_anime, only: %i(index show create update destroy)
  before_action :set_season, only: %i(update show destroy)

  def index
    @seasons = @anime.seasons.order(phase: :desc)
  end

  def show; end

  def create
    @season = @anime.seasons.new(season_params)
    if @season.save
      head :created
    else
      render_error @season
    end
  end

  def update
    if @season.update(season_params)
      head :ok
    else
      render_error @season
    end
  end

  def destroy
    @season.destroy
    head @season.destroyed? ? :ok : :forbidden
  end

  private

  def set_anime
    @anime = Anime.find(params[:anime_id])
  end

  def set_season
    @season = @anime.seasons.find(params[:id])
  end

  def season_params
    params.require(:season).permit(:phase, :name, :start_on, :end_on)
  end
end

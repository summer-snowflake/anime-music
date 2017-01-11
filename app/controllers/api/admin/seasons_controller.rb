# frozen_string_literal: true
class Api::Admin::SeasonsController < Api::BaseController
  before_action :set_anime, only: %i(index)

  def index
    @seasons = @anime.seasons
  end

  private

  def set_anime
    @anime = Anime.find(params[:anime_id])
  end
end

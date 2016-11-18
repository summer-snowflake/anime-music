class Api::Admin::AnimesController < ApplicationController
  before_action :set_anime, only: %i(show)

  def index
    @animes = Anime.all
  end

  def show
  end
 
  private

  def set_anime
    @anime = Anime.find(params[:id])
  end
end

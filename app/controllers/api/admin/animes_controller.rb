# frozen_string_literal: true
class Api::Admin::AnimesController < Api::BaseController
  before_action :set_anime, only: %i(show update)

  def index
    @animes = Anime.all
  end

  def show
    @seasons = @anime.seasons
  end

  def update
    sleep 3
    if @anime.update(anime_params)
      head :ok
    else
      render_error @anime
    end
  end

  private

  def set_anime
    @anime = Anime.find(params[:id])
  end

  def anime_params
    params.require(:anime).permit(:title, :summary, :wiki_url)
  end
end

# frozen_string_literal: true
class Api::Admin::AnimesController < Api::BaseController
  before_action :set_anime, only: %i(show update destroy)

  def index
    @animes = Anime.all
  end

  def show; end

  def update
    if @anime.update(anime_params)
      head :ok
    else
      render_error @anime
    end
  end

  def destroy
    @anime.destroy
    head @anime.destroyed? ? :ok : :forbidden
  end

  private

  def set_anime
    @anime = Anime.find(params[:id])
  end

  def anime_params
    params.require(:anime).permit(:title, :summary, :wiki_url)
  end
end

# frozen_string_literal: true

class Api::Admin::AnimesController < Api::Admin::BaseController
  before_action :set_anime, only: %i[show update destroy]

  def index
    @animes = Anime.all.order(created_at: :desc)
  end

  def show; end

  def create
    @anime = Anime.new(anime_params)
    if @anime.save
      head :created
    else
      render_error @anime
    end
  end

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

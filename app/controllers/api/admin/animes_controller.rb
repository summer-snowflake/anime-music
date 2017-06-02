# frozen_string_literal: true

class Api::Admin::AnimesController < Api::Admin::BaseController
  before_action :set_anime, only: %i[show update destroy]

  def index
    @animes = Anime.includes(seasons: :melodies)
                   .references(:seasons)
                   .order(created_at: :desc)
                   .order('seasons.phase desc, melodies.kind asc')
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
    params.permit(:title, :summary, :wiki_url, :picture, :remove_picture)
  end
end

# frozen_string_literal: true
class Admin::AnimesController < Admin::BaseController
  before_action :set_anime, only: [:show, :edit, :update, :destroy]

  def index
    @animes = Anime.all
  end

  def show
  end

  def new
    @anime = Anime.new
  end

  def edit
  end

  def create
    @anime = Anime.new(anime_params)

    respond_to do |format|
      if @anime.save
        format.html { redirect_to ['admin', @anime], notice: '追加しました' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @anime.update(anime_params)
        format.html { redirect_to ['admin', @anime], notice: '更新しました' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @anime.destroy
    respond_to do |format|
      format.html { redirect_to admin_animes_url, notice: '削除しました' }
    end
  end

  private

  def set_anime
    @anime = Anime.find(params[:id])
  end

  def anime_params
    params.require(:anime).permit(:title, :summary, :wiki_url, :picture)
  end
end

# frozen_string_literal: true
class Admin::MelodiesController < Admin::BaseController
  before_action :set_melody, only: [:show, :edit, :update, :destroy]
  before_action :set_animes, only: [:new, :create, :edit, :update]
  before_action :set_seasons, only: [:new, :create, :edit, :update]
  before_action :set_singers, only: [:new, :create, :edit, :update]

  def index
    @singers = Singer.all
    @melodies = Melody.all
  end

  def show
  end

  def new
    @melody = Melody.new
  end

  def edit
  end

  def create
    @melody = Melody.new(melody_params)

    respond_to do |format|
      if @melody.save
        format.html { redirect_to ['admin', @melody], notice: '追加しました' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @melody.update(melody_params)
        format.html { redirect_to ['admin', @melody], notice: '更新しました' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @melody.destroy
    respond_to do |format|
      format.html { redirect_to admin_melodies_url, notice: '削除しました' }
    end
  end

  private

  def set_melody
    @melody = Melody.find(params[:id])
  end

  def melody_params
    params.require(:melody)
          .permit(:anime_id, :season_id, :kind, :title, :singer_id, :music,
                  :lyric_writer, :composer, :adapter, :memo, :start_on, :end_on)
  end

  def set_animes
    @animes = Anime.all
  end

  def set_seasons
    @seasons = Season.all
  end

  def set_singers
    @singers = Singer.all
  end
end

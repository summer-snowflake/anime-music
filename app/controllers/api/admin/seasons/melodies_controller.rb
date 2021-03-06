# frozen_string_literal: true

class Api::Admin::Seasons::MelodiesController < Api::Admin::BaseController
  before_action :set_season, only: %i[index create update destroy]
  before_action :set_melody, only: %i[update destroy]

  # /api/admin/seasons/:season_id/melodies
  def index
    @melodies = Melody::Fetcher.all(season: @season, params: nil)
  end

  def create
    @melody = @season.melodies.new(melody_params)
    if @melody.save
      head :created
    else
      render_error @melody
    end
  end

  def update
    if @melody.update(melody_params)
      head :ok
    else
      render_error @melody
    end
  end

  def destroy
    @melody.destroy
    head @melody.destroyed? ? :ok : :forbidden
  end

  private

  def set_season
    @season = Season.find(params[:season_id])
  end

  def set_melody
    @melody = @season.melodies.find(params[:id])
  end

  def melody_params
    params.require(:melody)
          .permit(:draft, :title, :singer_name, :kind, :youtube,
                  :lyric_writer, :composer, :adapter, :memo)
  end
end

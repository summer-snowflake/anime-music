# frozen_string_literal: true

class Api::Admin::MelodiesController < Api::Admin::BaseController
  before_action :set_season, only: %i[index create]

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

  private

  def set_season
    @season = Season.find(params[:season_id])
  end

  def melody_params
    params.require(:melody).permit(:title, :kind)
  end
end

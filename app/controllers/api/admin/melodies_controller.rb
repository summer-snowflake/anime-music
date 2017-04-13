# frozen_string_literal: true

class Api::Admin::MelodiesController < Api::Admin::BaseController
  before_action :set_season, only: %i[index]

  def index
    @melodies = Melody::Fetcher.all(season: @season, kind: params[:kind])
  end

  private

  def set_season
    @season = Season.find(params[:season_id])
  end
end

# frozen_string_literal: true

class Api::AdvertisementsController < Api::BaseController
  before_action :set_season, only: %i[index]

  def index
    @advertisements = @season.welcome_advertisements
  end

  private

  def set_season
    @season = Season.find(params[:season_id])
  end
end

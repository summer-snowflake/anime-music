# frozen_string_literal: true

class Api::AnimesController < Api::BaseController
  before_action :set_anime, only: %i[show]

  def show; end

  private

  def set_anime
    @anime = Anime.find(params[:id]) if params[:id]
  end
end

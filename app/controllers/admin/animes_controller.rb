# frozen_string_literal: true

class Admin::AnimesController < Admin::BaseController
  before_action :set_anime, only: [:show]

  def index; end

  def show; end

  private

  def set_anime
    @anime = Anime.find(params[:id])
  end
end

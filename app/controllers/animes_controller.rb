# frozen_string_literal: true

class AnimesController < ApplicationController
  before_action :set_anime, only: %i[show]

  def show; end

  private

  def set_anime
    @anime = Anime.find(params[:id])
  end
end

# frozen_string_literal: true

class Api::AnimesController < Api::BaseController
  def index
    @animes = Anime.all
  end
end

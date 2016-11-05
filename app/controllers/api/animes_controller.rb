class Api::AnimesController < ApplicationController
  def index
    @animes = Anime.all
  end
end

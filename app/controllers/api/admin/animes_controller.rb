class Api::Admin::AnimesController < ApplicationController
  def index
    @animes = Anime.all
  end
end

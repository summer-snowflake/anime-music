class WelcomeController < ApplicationController
  def index
    @animes = Anime.all
  end
end

# frozen_string_literal: true

class Api::WelcomeController < Api::BaseController
  def show
    @animes = Anime.all
  end
end

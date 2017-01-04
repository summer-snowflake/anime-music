# frozen_string_literal: true
class AnimesController < ApplicationController
  def index
    @animes = Anime.all
  end
end

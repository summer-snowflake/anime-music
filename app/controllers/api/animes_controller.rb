# frozen_string_literal: true
class Api::AnimesController < ApplicationController
  def index
    @animes = Anime.all
  end
end

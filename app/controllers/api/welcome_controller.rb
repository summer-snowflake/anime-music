# frozen_string_literal: true

class Api::WelcomeController < Api::BaseController
  def show
    @seasons = Season.airing(Time.zone.today)
                     .includes(%i[anime melodies]).order(:id)
  end
end

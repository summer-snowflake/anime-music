# frozen_string_literal: true

class Api::WelcomeController < Api::BaseController
  def show
    @seasons = Season.airing(Time.zone.today)
                     .includes(%i[anime melodies])
                     .where('melodies.draft = ?', false)
                     .references(:melodies)
                     .order(:id)
  end
end

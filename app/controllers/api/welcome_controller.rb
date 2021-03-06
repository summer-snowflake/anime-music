# frozen_string_literal: true

class Api::WelcomeController < Api::BaseController
  def show
    @seasons = Season.airing(Time.zone.today)
                     .includes(%i[anime melodies advertisements])
                     .where('melodies.draft = ?', false)
                     .references(:melodies)
                     .order(:id)
                     .order('melodies.kind asc')
  end
end

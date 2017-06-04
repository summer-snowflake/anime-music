# frozen_string_literal: true

class WelcomeController < ApplicationController
  def index
    @seasons = Season.airing(Time.zone.today)
                     .includes(%i[anime melodies])
                     .where('melodies.draft = ?', false)
                     .references(:melodies)
                     .order(:id)
                     .order('melodies.kind asc')
  end
end

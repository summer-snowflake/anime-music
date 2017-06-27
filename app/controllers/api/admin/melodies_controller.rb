# frozen_string_literal: true

class Api::Admin::MelodiesController < Api::Admin::BaseController
  before_action :set_melody, only: %i[show]

  def show; end

  private

  def set_melody
    @melody = Melody.find(params[:id])
  end
end

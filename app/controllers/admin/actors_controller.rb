# frozen_string_literal: true

class Admin::ActorsController < Admin::BaseController
  before_action :set_actor, only: [:show]

  def index; end

  def show; end

  private

  def set_actor
    @actor = Actor.find(params[:id])
  end
end

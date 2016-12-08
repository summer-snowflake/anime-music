# frozen_string_literal: true
class Api::Admin::ActorsController < ApplicationController
  before_action :set_actor, only: %i(show)

  def index
    @actors = Actor.all
  end

  def show; end

  private

  def set_actor
    @actor = Actor.find(params[:id])
  end
end

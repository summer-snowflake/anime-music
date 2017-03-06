# frozen_string_literal: true
class Api::Admin::ActorsController < Api::BaseController
  before_action :set_actor, only: %i(show)

  def index
    @actors = Actor.order(created_at: :desc)
  end

  def show; end

  def create
    @actor = Actor.new(actor_params)
    if @actor.save
      head :created
    else
      render_error @actor
    end
  end

  private

  def set_actor
    @actor = Actor.find(params[:id])
  end

  def actor_params
    params.require(:actor).permit(:name)
  end
end

# frozen_string_literal: true

class Api::Admin::ActorsController < Api::BaseController
  before_action :set_actor, only: %i(show update destroy)

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

  def update
    if @actor.update(actor_params)
      head :ok
    else
      render_error @actor
    end
  end

  def destroy
    @actor.destroy
    head @actor.destroyed? ? :ok : :forbidden
  end

  private

  def set_actor
    @actor = Actor.find(params[:id])
  end

  def actor_params
    params.require(:actor).permit(:name)
  end
end
